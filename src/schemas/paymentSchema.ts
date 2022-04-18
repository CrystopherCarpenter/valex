import joi from 'joi';

export const paymentSchema = joi.object({
    password: joi.string().pattern(RegExp('^[0-9]{4,4}$')).required(),
    businessId: joi.number().required(),
    amount: joi.number().greater(0).required(),
});
