const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    rol: Joi.string().alphanum().required().valid('DireccionGeneral', 'Administracion', 'RecursosHumanos', 'Comercial1', 'Comercial2', 'Comercial3'),
    password: Joi.string().min(4).required(),
    password_conf: Joi.string().min(4).required()
});

module.exports = schema;