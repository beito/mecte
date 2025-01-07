const { Model, DataTypes, Sequelize } = require('sequelize');

const { carrerasTable } = require('./carreras.model');

const COMPETENCIAS = 'competencias';

const CompetenciasSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    codigo: {
        allowNull: false,
        type: DataTypes.STRING
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT
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
    idCarrera: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_carrera',
        references: {
            model: carrerasTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Competencias extends Model {
    static associate(models) { 
        this.belongsTo(models.Carreras, {as: 'Carreras', foreignKey: 'idCarrera'});
        this.hasMany(models.Subcompetencias, { as: 'Subcompetencias', foreignKey: 'idCompetencia' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMPETENCIAS,
            modelName: 'Competencias',
            timestamps: false
        }
    }
}

module.exports = { competenciasTable: COMPETENCIAS, CompetenciasSchema, Competencias }
