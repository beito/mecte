const Joi = require('joi');

const id = Joi.number().integer();
const puntaje = Joi.number();
const nivel = Joi.string();
const idSubcompetencia = Joi.number().integer();
const idAsignatura = Joi.number().integer();
const idPeriodoAcademico = Joi.number().integer();

const createOrUpdateEvaluacionesSchema = Joi.object({
    puntaje: puntaje.required(),
    nivel: nivel.required(),
    idSubcompetencia: idSubcompetencia.required(),
    idAsignatura: idAsignatura.required(),
    idPeriodoAcademico: idPeriodoAcademico.required(),
});

const getEvaluacionesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateEvaluacionesSchema, getEvaluacionesSchema }
