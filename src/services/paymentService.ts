import * as paymentRepository from '../repositories/paymentRepository.js';
import * as balanceService from '../services/balanceService.js';

export async function newPayment(paymentData: any) {
    await paymentRepository.insert(paymentData);

    return;
}

export async function verifyFunds(cardId: any, amount: number) {
    const { balance } = await balanceService.getData(cardId);
    const sufficientFund = balance >= amount;

    if (!sufficientFund) {
        throw { type: 'conflict', message: 'insufficient funds' };
    }

    return;
}
