import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";


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
