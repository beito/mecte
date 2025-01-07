const { Model, DataTypes, Sequelize } = require('sequelize');

const { subcompetenciasTable } = require('./subcompetencias.model');
const { asignaturasTable } = require('./asignaturas.model');
const { periodosAcademicosTable } = require('./periodos_academicos.model');

const EVALUACIONES = 'evaluaciones';

const EvaluacionesSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    puntaje: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    nivel: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at'
    },
    idSubcompetencia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_subconpetencia',
        references: {
            model: subcompetenciasTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idAsignatura: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_asignatura',
        references: {
            model: asignaturasTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idPeriodoAcademico: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_periodo_academico',
        references: {
            model: periodosAcademicosTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Evaluaciones extends Model {
    static associate(models) {
        this.belongsTo(models.Subcompetencias, { as: 'Subcompetencias', foreignKey: 'idSubcompetencia' });
        this.belongsTo(models.Asignaturas, { as: 'Asignaturas', foreignKey: 'idAsignatura' });
        this.belongsTo(models.PeriodosAcademicos, { as: 'PeriodosAcademicos', foreignKey: 'idPeriodoAcademico' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EVALUACIONES,
            modelName: 'Evaluaciones',
            timestamps: false
        }
    }
}

module.exports = { evaluacionesTable: EVALUACIONES, EvaluacionesSchema, Evaluaciones }
