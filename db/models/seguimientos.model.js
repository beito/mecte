const { Model, DataTypes, Sequelize } = require('sequelize');

const { actividadesTable } = require('./actividades.model');

const SEGUIMIENTOS = 'seguimientos';

const SeguimientosSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'descripcion'
    },
    resultados: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'resultados'
    },
    acciones: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'acciones'
    },
    fecha: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha'
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
    idActividad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_actividad',
        references: {
            model: actividadesTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Seguimientos extends Model {
    static associate(models) {
        this.belongsTo(models.Actividades, {as: 'Actividades', foreignKey: 'idActividad'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SEGUIMIENTOS,
            modelName: 'Seguimientos',
            timestamps: false
        }
    }
}

module.exports = { seguimientosTable: SEGUIMIENTOS, SeguimientosSchema, Seguimientos }