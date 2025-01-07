const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USUARIOS = 'usuarios';

const UsuariosSchema = {
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
    email: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    },
    disabled: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        defaultValue: 0
    },
    firstLogin: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        field: 'first_login',
        defaultValue: 1
    },
    restoreCode: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'restore_code',
        defaultValue: '-1'
    },
    role: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
}

class Usuarios extends Model {
    static associate(models) {
        this.hasMany(models.Decanos, { as: 'Decanos', foreignKey: 'idUsuario' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USUARIOS,
            modelName: 'Usuarios',
            timestamps: false,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user && (user.dataValues.password !== user._previousDataValues.password)) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        }
    }

    validPassword(password, storedPassword) {
        return bcrypt.compareSync(password, storedPassword);
    }
}

module.exports = { usuariosTable: USUARIOS, UsuariosSchema, Usuarios }
