const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const idFacultad = Joi.number().integer();
const idUsuario = Joi.number().integer();

const createOrUpdateDecanosSchema = Joi.object({
  codigo: codigo.required(),
  idFacultad: idFacultad.required(),
  idUsuario: idUsuario.required(),
});

const getDecanosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateDecanosSchema, getDecanosSchema }
