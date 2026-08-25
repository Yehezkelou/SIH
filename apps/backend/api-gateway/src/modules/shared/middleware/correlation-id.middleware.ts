import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        const correlationId = (req.headers['x-correlation-id'] as string) || `corr-${Math.random().toString(36).substring(2, 15)}`;

        // injecter dans la requete et la reponse 
        req.headers['x-correlation-id'] = correlationId;
        res.setHeader('x-correlation-id', correlationId);

        // Continuer le traitement 
        next();
    }
}