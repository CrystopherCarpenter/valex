import * as companyRepository from '../repositories/companyRepository.js';

export async function validateApiKey(apiKey: string) {
    if (!apiKey) {
        throw { type: 'not_found', message: 'company not found' };
    }

    const company = await companyRepository.findByApiKey(apiKey);

    if (!company) {
        throw { type: 'not_found', message: 'company not found' };
    }

    return company;
}
