import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

interface Counter {
    count: number;
    resetAt: number;
}

/**
 * Rate limiting sous forme de MIDDLEWARE (et non de guard).
 *
 * Comme pour l'authentification, le proxy termine la requête avant la couche
 * des guards NestJS : un `ThrottlerGuard` ne protégerait donc jamais les routes
 * proxifiées. Fenêtre fixe en mémoire, à parité avec l'ancien `ThrottlerModule`
 * (in-memory, mono-instance). Pour plusieurs répliques, prévoir un store partagé
 * (Redis) via `express-rate-limit` + `rate-limit-redis`.
 *
 * Deux profils, dans l'esprit de l'ancienne configuration :
 *  - "login" : strict, uniquement sur POST /api/auth/login
 *  - "global" : standard, sur toutes les routes
 */
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private readonly globalStore = new Map<string, Counter>();
    private readonly loginStore = new Map<string, Counter>();

    private readonly globalTtl = (Number(process.env.THROTTLE_TTL) || 60) * 1000;
    private readonly globalLimit = Number(process.env.THROTTLE_LIMIT) || 100;
    private readonly loginTtl = 60 * 1000; // 1 minute
    private readonly loginLimit = 5; // Max 5 requêtes

    use(req: Request, res: Response, next: (error?: any) => void) {
        const key = this.clientIp(req);
        const now = Date.now();
        // req.path est relatif au montage du middleware ("/") : on utilise originalUrl.
        const path = (req.originalUrl || req.url).split("?")[0];

        // Profil "login" : uniquement sur la route de login
        if (req.method === "POST" && path === "/api/auth/login") {
            if (!this.consume(this.loginStore, key, now, this.loginLimit, this.loginTtl, res)) {
                return;
            }
        }

        // Profil "global" : sur toutes les routes
        if (!this.consume(this.globalStore, key, now, this.globalLimit, this.globalTtl, res)) {
            return;
        }

        next();
    }

    private consume(
        store: Map<string, Counter>,
        key: string,
        now: number,
        limit: number,
        ttl: number,
        res: Response
    ): boolean {
        // Purge opportuniste pour éviter une croissance non bornée de la Map
        if (store.size > 10000) {
            for (const [k, v] of store) {
                if (v.resetAt <= now) store.delete(k);
            }
        }

        let entry = store.get(key);
        if (!entry || entry.resetAt <= now) {
            entry = { count: 0, resetAt: now + ttl };
            store.set(key, entry);
        }
        entry.count++;

        const remaining = Math.max(0, limit - entry.count);
        res.setHeader("X-RateLimit-Limit", String(limit));
        res.setHeader("X-RateLimit-Remaining", String(remaining));

        if (entry.count > limit) {
            const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
            res.setHeader("Retry-After", String(retryAfter));
            res.status(429).json({
                statusCode: 429,
                message: "Trop de requêtes, veuillez réessayer plus tard.",
                error: "Too Many Requests",
                timestamp: new Date().toISOString(),
            });
            return false;
        }

        return true;
    }

    private clientIp(req: Request): string {
        const xff = req.headers["x-forwarded-for"];
        if (typeof xff === "string" && xff.length > 0) {
            return xff.split(",")[0].trim();
        }
        return req.ip || req.socket.remoteAddress || "unknown";
    }
}
