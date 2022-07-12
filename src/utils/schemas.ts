import Joi from "joi";

export const activateCardSchema = Joi.object({
    cardId: Joi.number().required(),
    securityCode: Joi.number().required(),
    password: Joi.number().required()
})

export const rechargeSchema = Joi.object({
    cardId: Joi.number().required(),
    amount: Joi.number().greater(0).required()
})