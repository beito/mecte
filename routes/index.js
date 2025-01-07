const express = require('express');

const verifyToken = require("middlewares/auth.handler");

const authRouter = require('./auth.routes');
const actividadesRouter = require('./actividades.routes');
const asignaturasRouter = require('./asignaturas.routes');
const carrerasRouter = require('./carreras.routes');
const competenciasRouter = require('./competencias.routes');
const decanosRouter = require('./decanos.routes');
const evaluacionesRouter = require('./evaluaciones.routes');
const facultadesRouter = require('./facultades.routes');
const periodosAcademicosRouter = require('./periodosAcademicos.routes');
const procesosMejoraRouter = require('./procesosMejora.routes');
const seguimientosRouter = require('./seguimientos.routes');
const subCompetenciasRouter = require('./subCompetencias.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/actividades', verifyToken, actividadesRouter);
  router.use('/asignaturas', verifyToken, asignaturasRouter);
  router.use('/carreras', verifyToken, carrerasRouter);
  router.use('/competencias', verifyToken, competenciasRouter);
  router.use('/decanos', verifyToken, decanosRouter);
  router.use('/evaluaciones', verifyToken, evaluacionesRouter);
  router.use('/facultades', verifyToken, facultadesRouter);
  router.use('/periodos-academicos', verifyToken, periodosAcademicosRouter);
  router.use('/procesos-mejora', verifyToken, procesosMejoraRouter);
  router.use('/seguimientos', verifyToken, seguimientosRouter);
  router.use('/sub-competencias', verifyToken, subCompetenciasRouter);
}

module.exports = routerApi;
