const Joi = require('joi');

const id = Joi.number().integer();
const codigo = Joi.string().min(3);
const descripcion = Joi.string();
const acciones = Joi.string();
const deadline = Joi.date();
const status = Joi.string();
const idProcesoMejora = Joi.number().integer();

const createOrUpdateActividadesSchema = Joi.object({
  codigo: codigo.required(),
  descripcion: descripcion.required(),
  acciones: acciones.required(),
  deadline: deadline.required(),
  status: status.required(),
  idProcesoMejora: idProcesoMejora.required(),
});

const getActividadesSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrUpdateActividadesSchema, getActividadesSchema }
