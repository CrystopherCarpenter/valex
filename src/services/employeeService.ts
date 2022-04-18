import * as employeeRepository from '../repositories/employeeRepository.js';

export async function verifyId(id: number) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
        throw { type: 'not_found', message: 'employee not found' };
    }

    return employee;
}

export async function verifyCompany(employee: any, companyId: number) {
    if (employee.companyId !== companyId) {
        throw { type: 'not_found', message: 'employee not found' };
    }

    return;
}
