const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string();
const codigo = Joi.string().min(3);

const createOrUpdateFacultadesSchema = Joi.object({
    nombre: nombre.required(),
    codigo: codigo.required(),
});

const getFacultadesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateFacultadesSchema, getFacultadesSchema }
