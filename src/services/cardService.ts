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

export async function verifyId(id: any) {
    const card = await cardRepository.findById(id);

    if (!card) {
        throw { type: 'not_found', message: 'card not found' };
    }

    return card;
}

export async function verifyExpiration(expirationDate: string) {
    const expirated = dayjs().format('MM/YY') > expirationDate;

    if (expirated) {
        throw { type: 'conflict', message: 'card expirated' };
    }

    return;
}

export async function verifySecurity(authData: string, persistedData: string) {
    if (!bcrypt.compareSync(authData, persistedData)) {
        throw { type: 'bad_request', message: 'invalid authentication' };
    }

    return;
}

export async function alreadyActive(password: string) {
    if (password !== null) {
        throw { type: 'bad_request', message: 'card already active' };
    }

    return;
}

export async function verifyActivation(password: string) {
    if (!password) {
        throw { type: 'bad_request', message: 'card not activated' };
    }

    return;
}

export async function verifyBlock(blocked: boolean, path: string) {
    if (path === 'block' && blocked) {
        throw { type: 'bad_request', message: 'card already blocked' };
    }

    if (path === 'unblock' && !blocked) {
        throw { type: 'bad_request', message: 'card already unblocked' };
    }

    return;
}

export async function isBlocked(isBlocked: boolean) {
    if (isBlocked) {
        throw { type: 'bad_request', message: 'card is blocked' };
    }

    return;
}

export async function create(type: any, employee: any) {
    const number = faker.finance.creditCardNumber('mastercard');
    const CVV = faker.finance.creditCardCVV();
    const securityCode = bcrypt.hashSync(CVV, 10);
    const expirationDate = dayjs().add(5, 'year').format('MM/YY');
    const cardholderName = name(employee.fullName);
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

    return;
}

export async function activate(card: any, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);
    const cardData = { ...card, password: passwordHash };
    delete cardData.id;

    await cardRepository.update(card.id, cardData);

    return;
}

export async function blockUnblock(card: any, path: string) {
    const isBlocked = path === 'block' ? true : false;
    const cardData = { ...card, isBlocked };
    delete cardData.id;

    await cardRepository.update(card.id, cardData);

    return;
}

function name(employeeName: string) {
    const name: string[] = employeeName.toUpperCase().split(' ');

    for (let i = 1; i < name.length - 1; i++) {
        if (name[i].length > 2) {
            name[i] = name[i][0];
        } else {
            name[i] = '';
        }
    }

    return name.join(' ');
}
