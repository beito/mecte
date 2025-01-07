const { Usuarios, UsuariosSchema } = require('./usuarios.model');

const { Seguimientos, SeguimientosSchema } = require('./seguimientos.model');
const { Actividades, ActividadesSchema } = require('./actividades.model');
const { Asignaturas, AsignaturasSchema } = require('./asignaturas.model');
const { Carreras, CarrerasSchema } = require('./carreras.model');
const { Competencias, CompetenciasSchema } = require('./competencias.model');
const { Decanos, DecanosSchema } = require('./decanos.model');
const { Evaluaciones, EvaluacionesSchema } = require('./evaluaciones.model');
const { Facultades, FacultadesSchema } = require('./facultades.model');
const { PeriodosAcademicos, PeriodosAcademicosSchema } = require('./periodos_academicos.model');
const { ProcesoMejora, ProcesoMejoraSchema } = require('./procesos_mejora.model');
const { Subcompetencias, SubcompetenciasSchema } = require('./subcompetencias.model');

const models = {
    Usuarios,
    Seguimientos,
    Asignaturas,
    Carreras,
    Competencias,
    Decanos,
    Evaluaciones,
    Facultades,
    PeriodosAcademicos,
    ProcesoMejora,
    Subcompetencias
};

function setupModels(sequelize) {
  Usuarios.init(UsuariosSchema, Usuarios.config(sequelize));

  Seguimientos.init(SeguimientosSchema, Seguimientos.config(sequelize));
  Actividades.init(ActividadesSchema, Actividades.config(sequelize));
  Asignaturas.init(AsignaturasSchema, Asignaturas.config(sequelize));
  Carreras.init(CarrerasSchema, Carreras.config(sequelize));
  Competencias.init(CompetenciasSchema, Competencias.config(sequelize));
  Decanos.init(DecanosSchema, Decanos.config(sequelize));
  Evaluaciones.init(EvaluacionesSchema, Evaluaciones.config(sequelize));
  Facultades.init(FacultadesSchema, Facultades.config(sequelize));
  PeriodosAcademicos.init(PeriodosAcademicosSchema, PeriodosAcademicos.config(sequelize));
  ProcesoMejora.init(ProcesoMejoraSchema, ProcesoMejora.config(sequelize));
  Subcompetencias.init(SubcompetenciasSchema, Subcompetencias.config(sequelize));

  Usuarios.associate(sequelize.models);

  Seguimientos.associate(sequelize.models);
  Actividades.associate(sequelize.models);
  Asignaturas.associate(sequelize.models);
  Carreras.associate(sequelize.models);
  Competencias.associate(sequelize.models);
  Decanos.associate(sequelize.models);
  Evaluaciones.associate(sequelize.models);
  Facultades.associate(sequelize.models);
  PeriodosAcademicos.associate(sequelize.models);
  ProcesoMejora.associate(sequelize.models);
  Subcompetencias.associate(sequelize.models);
}

module.exports = {
  setupModels,
  models
};
