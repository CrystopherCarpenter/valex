import { Request, Response } from 'express';

export async function getBalance(req: Request, res: Response) {
    const { id: cardId } = req.params;
    return res.send({ cardId });
}
