import joi from 'joi';

export const activationSchema = joi.object({
    CVC: joi.string().min(3).max(3).required(),
    password: joi.string().pattern(RegExp('^[0-9]{4,4}$')).required(),
});
