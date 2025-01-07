const { Model, DataTypes, Sequelize } = require('sequelize');

const { competenciasTable } = require('./competencias.model');

const SUBCOMPETENCIAS = 'subcompetencias';

const SubcompetenciasSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    codigo: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT,
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
    idCompetencia: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_competencia',
        references: {
            model: competenciasTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Subcompetencias extends Model {
    static associate(models) {
        this.belongsTo(models.Competencias, {as: 'Competencias', foreignKey: 'idCompetencia'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SUBCOMPETENCIAS,
            modelName: 'Subcompetencias',
            timestamps: false
        }
    }
}

module.exports = { subcompetenciasTable: SUBCOMPETENCIAS, SubcompetenciasSchema, Subcompetencias }
