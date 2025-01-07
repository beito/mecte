const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const descripcion = Joi.string();
const idCompetencia = Joi.number().integer();

const createOrUpdateSubCompetenciasSchema = Joi.object({
  codigo: codigo.required(),
  descripcion: descripcion.required(),
  idCompetencia: idCompetencia.required(),
});

const getSubCompetenciasSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateSubCompetenciasSchema, getSubCompetenciasSchema }
