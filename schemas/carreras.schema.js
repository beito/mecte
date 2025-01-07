const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3);
const codigo = Joi.string();
const idFacultad = Joi.number().integer();

const createOrUpdateCarrerasSchema = Joi.object({
  nombre: nombre.required(),
  codigo: codigo.required(),
  idFacultad: idFacultad.required(),
});

const getCarrerasSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateCarrerasSchema, getCarrerasSchema }
