import joi from 'joi';

export const newCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi
        .string()
        .valid('groceries', 'restaurants', 'transport', 'education', 'health'),
});
