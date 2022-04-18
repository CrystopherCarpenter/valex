import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function createNew(rechargeData: any) {
    await rechargeRepository.insert(rechargeData);

    return;
}
