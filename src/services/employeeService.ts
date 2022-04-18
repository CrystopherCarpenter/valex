import * as employeeRepository from '../repositories/employeeRepository.js';

export async function verifyEmployee(id: number, companyId: number) {
    const employee = await employeeRepository.findById(id);

    if (!employee || employee.companyId !== companyId) {
        throw { type: 'not_found', message: 'employee not found' };
    }

    return employee;
}
