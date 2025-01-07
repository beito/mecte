const { Model, DataTypes, Sequelize } = require('sequelize');

const PERIODOSACADEMICOS = 'periodosacademicos';

const PeriodosAcademicosSchema = {
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
    anios: {
        allowNull: false,
        type: DataTypes.STRING
    },
    periodo: {
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

class PeriodosAcademicos extends Model {
  static associate(models) {
    this.hasMany(models.Evaluaciones, { as: 'Evaluaciones', foreignKey: 'idPeriodoAcademico' });
  }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PERIODOSACADEMICOS,
            modelName: 'PeriodosAcademicos',
            timestamps: false
        }
    }
}

module.exports = { periodosAcademicosTable: PERIODOSACADEMICOS, PeriodosAcademicosSchema, PeriodosAcademicos }
