const { Model, DataTypes, Sequelize } = require('sequelize');

const FACULTADES = 'facultades';

const FacultadesSchema = {
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
    }
}

class Facultades extends Model {
    static associate(models) { 
        this.hasMany(models.Carreras, { as: 'Carreras', foreignKey: 'idFacultad' });
        this.hasMany(models.Decanos, { as: 'Decanos', foreignKey: 'idFacultad' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: FACULTADES,
            modelName: 'Facultades',
            timestamps: false
        }
    }
}

module.exports = { facultadesTable: FACULTADES, FacultadesSchema, Facultades }
