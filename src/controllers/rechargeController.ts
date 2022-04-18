import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import * as rechargeService from '../services/rechargeServices.js';

export async function recharge(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { amount } = req.body;
    const card = await cardService.verifyId(cardId);

    await cardService.verifyExpiration(card.expirationDate);

    await rechargeService.createNew({ cardId, amount });

    return res.sendStatus(200);
}
