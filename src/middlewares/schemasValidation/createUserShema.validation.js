const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    rol: Joi.string().alphanum().required().valid('Comercial', 'RecursosHumanos'),
    password: Joi.string().min(4).required(),
    password_conf: Joi.string().min(4).required()
});

module.exports = schema;