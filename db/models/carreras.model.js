const { Model, DataTypes, Sequelize } = require('sequelize');

const { facultadesTable } = require('./facultades.model');

const CARRERAS = 'carreras';

const CarrerasSchema = {
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
    idFacultad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_facultad',
        references: {
            model: facultadesTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Carreras extends Model {
    static associate(models) { 
        this.belongsTo(models.Facultades, {as: 'Facultades', foreignKey: 'idFacultad'});
        this.hasMany(models.ProcesoMejora, { as: 'ProcesoMejora', foreignKey: 'idCarrera' });
        this.hasMany(models.Asignaturas, { as: 'Asignaturas', foreignKey: 'idCarrera' });
        this.hasMany(models.Competencias, { as: 'Competencias', foreignKey: 'idCarrera' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CARRERAS,
            modelName: 'Carreras',
            timestamps: false
        }
    }
}

module.exports = { carrerasTable: CARRERAS, CarrerasSchema, Carreras }
