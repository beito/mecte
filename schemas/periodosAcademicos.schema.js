const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const anios = Joi.string();
const periodo = Joi.string();

const createOrUpdatePeriodosAcademicosSchema = Joi.object({
  codigo: codigo.required(),
  anios: anios.required(),
  periodo: periodo.required(),
});

const getPeriodosAcademicosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdatePeriodosAcademicosSchema, getPeriodosAcademicosSchema }
