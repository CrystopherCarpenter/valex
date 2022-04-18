import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService.js';
import * as cardService from '../services/cardService.js';

export async function newCard(req: Request, res: Response) {
    const { employeeId, type } = req.body;
    const company = res.locals.company;
    const employee = await employeeService.verifyEmployee(
        employeeId,
        company.id
    );
    await cardService.verifyTypeAndEmployee(type, employeeId);

    await cardService.createNewCard(type, employee);

    return res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { id: cardId } = req.params;
    const { CVC, password } = req.body;
    return res.send({ cardId, CVC, password });
}
