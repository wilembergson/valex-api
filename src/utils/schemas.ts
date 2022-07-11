import Joi from "joi";

export const activateCardSchema = Joi.object({
    cardId: Joi.number().required(),
    securityCode: Joi.number().required(),
    password: Joi.number().required()
})