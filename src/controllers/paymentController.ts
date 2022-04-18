import { Request, Response } from 'express';

export async function newPayment(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { password, businessId, amount } = req.body;
    return res.send({
        cardId,
        password,
        businessId,
        amount,
    });
}
