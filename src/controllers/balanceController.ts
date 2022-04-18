import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';

export async function getBalance(req: Request, res: Response) {
    const { id } = req.params;

    await cardService.verifyId(id);

    return res.send();
}
