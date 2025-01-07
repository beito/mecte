const { Model, DataTypes, Sequelize } = require('sequelize');

const { procesoMejoraTable } = require('./procesos_mejora.model');

const ACTIVIDADES = 'actividades';

const ActividadesSchema = {
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
    acciones: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    deadline: {
        allowNull: false,
        type: DataTypes.DATE
    },
    status: {
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
    idProcesoMejora: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_procesomejora',
        references: {
            model: procesoMejoraTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Actividades extends Model {
    static associate(models) {
        this.belongsTo(models.ProcesoMejora, {as: 'ProcesoMejora', foreignKey: 'idProcesoMejora'});
        this.hasMany(models.Seguimientos, { as: 'Seguimientos', foreignKey: 'idActividad' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ACTIVIDADES,
            modelName: 'Actividades',
            timestamps: false
        }
    }
}

module.exports = { actividadesTable: ACTIVIDADES, ActividadesSchema, Actividades }
