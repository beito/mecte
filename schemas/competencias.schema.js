const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const descripcion = Joi.string();
const idCarrera = Joi.number().integer();

const createOrUpdateCompetenciasSchema = Joi.object({
  codigo: codigo.required(),
  descripcion: descripcion.required(),
  idCarrera: idCarrera.required(),
});

const getCompetenciasSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateCompetenciasSchema, getCompetenciasSchema }
