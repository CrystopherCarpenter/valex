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

export async function verifyCVC(CVC: string, securityCode: string) {
    if (!bcrypt.compareSync(CVC, securityCode)) {
        throw { type: 'conflict', message: 'CVC does not match' };
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
