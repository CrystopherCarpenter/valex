import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function getData(cardId: any) {
    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);
    const balance: number =
        getTotalAmount(recharges) - getTotalAmount(transactions);

    return { balance, transactions, recharges };
}

function getTotalAmount(data: any[]) {
    const amounts = data.map((transaction) => transaction.amount);
    if (amounts.length === 0) return 0;
    const totalAmount = amounts.reduce(
        (current: number, sum: number) => sum + current
    );

    return totalAmount;
}
