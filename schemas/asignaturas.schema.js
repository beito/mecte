const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3);
const codigo = Joi.string();
const idCarrera = Joi.number().integer();

const createOrUpdateAsignaturasSchema = Joi.object({
  nombre: nombre.required(),
  codigo: codigo.required(),
  idCarrera: idCarrera.required(),
});

const getAsignaturasSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateAsignaturasSchema, getAsignaturasSchema }
