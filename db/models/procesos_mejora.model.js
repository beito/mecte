const { Model, DataTypes, Sequelize } = require('sequelize');

const { carrerasTable } = require('./carreras.model');

const PROCESO_MEJORA = 'proceso_mejora';

const ProcesoMejoraSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    codigo: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'codigo'
    },
    fechaInicio: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_inicio'
    },
    fechaFin: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'fecha_fin'
    },
    objetivos: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'objetivos'
    },
    descripcion: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'descripcion'
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'status'
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

class ProcesoMejora extends Model {
    static associate(models) { 
        this.belongsTo(models.Carreras, {as: 'Carreras', foreignKey: 'idCarrera'});
        this.hasMany(models.Actividades, { as: 'Actividades', foreignKey: 'idProcesoMejora' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROCESO_MEJORA,
            modelName: 'ProcesoMejora',
            timestamps: false
        }
    }
}

module.exports = { procesoMejoraTable: PROCESO_MEJORA, ProcesoMejoraSchema, ProcesoMejora }
