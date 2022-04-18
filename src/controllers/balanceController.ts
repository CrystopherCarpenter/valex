import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import * as balanceService from '../services/balanceService.js';

export async function getBalance(req: Request, res: Response) {
    const { id } = req.params;

    await cardService.verifyId(id);

    const balance = await balanceService.getData(id);

    return res.send(balance);
}
