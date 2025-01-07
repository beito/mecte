const { Model, DataTypes, Sequelize } = require('sequelize');

const { carrerasTable } = require('./carreras.model');

const ASIGNATURAS = 'asignaturas';

const AsignaturasSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    codigo: {
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

class Asignaturas extends Model {
    static associate(models) { 
        this.belongsTo(models.Carreras, {as: 'Carreras', foreignKey: 'idCarrera'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ASIGNATURAS,
            modelName: 'Asignaturas',
            timestamps: false
        }
    }
}

module.exports = { asignaturasTable: ASIGNATURAS, AsignaturasSchema, Asignaturas }
