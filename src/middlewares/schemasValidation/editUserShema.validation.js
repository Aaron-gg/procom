const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    rol: Joi.string().alphanum().required().valid('Comercial', 'RecursosHumanos'),
    password: Joi.string(),
    password_conf: Joi.string()
});

module.exports = schema;