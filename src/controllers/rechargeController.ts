import { Request, Response } from 'express';

export async function recharge(req: Request, res: Response) {
    const apiKey = req.headers['x-api-key'];
    const { id: cardId } = req.params;
    const { amount } = req.body;
    const company = res.locals.company;

    return res.send({ company, cardId, apiKey, amount });
}
