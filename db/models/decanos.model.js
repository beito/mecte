const { Model, DataTypes, Sequelize } = require('sequelize');

const { facultadesTable } = require('./facultades.model');
const { usuariosTable } = require('./usuarios.model');

const DECANOS = 'decanos';

const DecanosSchema = {
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
    },
    idUsuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_usuario',
        references: {
            model: usuariosTable,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Decanos extends Model {
    static associate(models) {
        this.belongsTo(models.Facultades, {as: 'Facultades', foreignKey: 'idFacultad'});
        this.belongsTo(models.Usuarios, {as: 'Usuarios', foreignKey: 'idUsuario'});
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DECANOS,
            modelName: 'Decanos',
            timestamps: false
        }
    }
}

module.exports = { decanosTable: DECANOS, DecanosSchema, Decanos }
