const Joi = require('joi');

const id = Joi.number().integer();
const descripcion = Joi.string();
const resultados = Joi.string();
const acciones = Joi.string();
const fecha = Joi.date();
const idActividad = Joi.number().integer();

const createOrUpdateSeguimientosSchema = Joi.object({
  descripcion: descripcion.required(),
  resultados: resultados.required(),
  acciones: acciones.required(),
  fecha: fecha.required(),
  idActividad: idActividad.required(),
});

const getSeguimientosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateSeguimientosSchema, getSeguimientosSchema }
