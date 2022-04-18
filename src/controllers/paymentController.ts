import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import * as paymentService from '../services/paymentService.js';
import * as businessService from '../services/businessService.js';

export async function newPayment(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { password, businessId, amount } = req.body;
    const card = await cardService.verifyId(cardId);
    const business = await businessService.verifyId(businessId);
    await cardService.verifyExpiration(card.expirationDate);
    await cardService.verifySecurity(password, card.password);
    await businessService.verifyType(business.type, card.type);
    await paymentService.verifyFunds(cardId, amount);
    await paymentService.newPayment({ cardId, businessId, amount });

    return res.sendStatus(200);
}
