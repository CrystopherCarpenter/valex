import joi from 'joi';

export const rechargeSchema = joi.object({
    amount: joi.number().greater(0).required(),
});
