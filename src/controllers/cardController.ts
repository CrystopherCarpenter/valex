import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService.js';
import * as cardService from '../services/cardService.js';

export async function newCard(req: Request, res: Response) {
    const { employeeId, type } = req.body;
    const company = res.locals.company;
    const employee = await employeeService.verifyId(employeeId);
    await employeeService.verifyCompany(employee, company.id);
    await cardService.verifyTypeAndEmployee(type, employeeId);
    await cardService.create(type, employee);

    return res.sendStatus(201);
}

export async function activate(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { CVC, password } = req.body;
    const card = await cardService.verifyId(cardId);
    await cardService.verifyExpiration(card.expirationDate);
    await cardService.alreadyActive(card.password);
    await cardService.verifySecurity(CVC, card.securityCode);
    await cardService.activate(card, password);

    return res.sendStatus(200);
}

export async function blockUnblockCard(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { password } = req.body;
    const path = req.path.split('/').reverse()[0];
    const card = await cardService.verifyId(cardId);
    await cardService.verifyExpiration(card.expirationDate);
    await cardService.verifyActivation(card.password);
    await cardService.verifyBlock(card.isBlocked, path);
    await cardService.verifySecurity(password, card.password);
    await cardService.blockUnblock(card, path);

    return res.sendStatus(200);
}
