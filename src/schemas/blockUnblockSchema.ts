import joi from 'joi';

export const blockUnblockSchema = joi.object({
    password: joi.string().pattern(RegExp('^[0-9]{4,4}$')).required(),
});
