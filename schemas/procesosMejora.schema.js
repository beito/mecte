const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const fechaInicio = Joi.date();
const fechaFin = Joi.date();
const objetivos = Joi.string();
const descripcion = Joi.string();
const status = Joi.string();
const idCarrera = Joi.number().integer();

const createOrUpdateProcesosMejoraSchema = Joi.object({
  codigo: codigo.required(),
  fechaInicio: fechaInicio.required(),
  fechaFin: fechaFin.required(),
  objetivos: objetivos.required(),
  descripcion: descripcion.required(),
  status: status.required(),
  idCarrera: idCarrera.required(),
});

const getProcesosMejoraSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateProcesosMejoraSchema, getProcesosMejoraSchema }
