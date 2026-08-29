import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * CORS géré en MIDDLEWARE, en tête de chaîne.
 *
 * `app.enableCors()` (niveau app) ne s'exécute pas de façon fiable AVANT le
 * proxy et les middlewares de module : pour les routes proxifiées, la réponse
 * est écrite par le proxy, et la préflight `OPTIONS` était bloquée par le
 * middleware d'auth (401 « Jeton manquant ») avant d'être traitée.
 *
 * Ce middleware répond à la préflight directement au niveau gateway et pose les
 * en-têtes CORS avant tout le reste. On reflète l'origine autorisée au lieu de
 * `*`, car `*` est invalide avec `Access-Control-Allow-Credentials: true`.
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
    // Liste blanche via CORS_ORIGIN (séparée par des virgules). Non défini => on
    // reflète l'origine de la requête (pratique en dev, à restreindre en prod).
    private readonly allowedOrigins: string[] | null = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
        : null;

    use(req: Request, res: Response, next: (error?: any) => void) {
        const origin = req.headers.origin;

        if (origin && (this.allowedOrigins === null || this.allowedOrigins.includes(origin))) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Vary", "Origin");
        }

        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        res.setHeader(
            "Access-Control-Allow-Headers",
            (req.headers["access-control-request-headers"] as string) ||
                "Content-Type,Authorization,X-Correlation-Id"
        );

        // Réponse immédiate à la préflight : ne doit pas atteindre auth/proxy
        if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Max-Age", "86400");
            return res.sendStatus(204);
        }

        next();
    }
}
