import * as businessRepository from '../repositories/businessRepository.js';

export async function verifyId(id: any) {
    const business = await businessRepository.findById(id);

    if (!business) {
        throw { type: 'not_found', message: 'business not found' };
    }

    return business;
}

export async function verifyType(businessType: string, cardType: string) {
    if (businessType !== cardType) {
        throw {
            type: 'conflict',
            message: 'business and card types do not match',
        };
    }

    return;
}
