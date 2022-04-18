import * as cardRepository from '../repositories/cardRepository.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

export async function verifyTypeAndEmployee(type: any, employeeId: number) {
    const cardByType = await cardRepository.findByTypeAndEmployeeId(
        type,
        employeeId
    );

    if (cardByType) {
        throw { type: 'conflict', message: 'this type already exist' };
    }

    return;
}

export async function createNewCard(type: any, employee: any) {
    const number = faker.finance.creditCardNumber('mastercard');
    const CVV = faker.finance.creditCardCVV();
    const securityCode = bcrypt.hashSync(CVV, 10);
    const expirationDate = dayjs().add(5, 'year').format('MM/YY');
    const cardholderName = cardName(employee.fullName);
    const cardData = {
        employeeId: employee.id,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type,
    };

    await cardRepository.insert(cardData);
    const cards = await cardRepository.find();
    console.log(cards, CVV);
    return;
}

function cardName(employeeName: string) {
    const cardName: string[] = employeeName.toUpperCase().split(' ');

    for (let i = 1; i < cardName.length - 1; i++) {
        if (cardName[i].length > 2) {
            cardName[i] = cardName[i][0];
        } else {
            cardName[i] = '';
        }
    }

    return cardName.join(' ');
}
