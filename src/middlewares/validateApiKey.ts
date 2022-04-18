import { NextFunction, Request, Response } from 'express';
import * as companyService from '../services/companyService.js';

export default async function validateApiKey(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey: any = req.headers['x-api-key'];

    const company = await companyService.validateApiKey(apiKey);

    res.locals.company = company;

    next();
}
