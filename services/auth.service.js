const { Op } = require("sequelize");
const { models } = require('utils/sequelize');
const jwt = require('jsonwebtoken');

const utils = require("../utils/misc/crypto");
const { transporter, readTemplateByPath } = require("../utils/email");

class AuthService {
    constructor() {
        this.model = models.Usuarios;
    }

    async validateRecoveryCode(recoveryCode) {
        const { user_email, restoreCode } = recoveryCode;
        try {
            const response = await this.model.findAll({
                attributes: ['id', 'email'],
                where: {
                    [Op.and]: [
                        { email: user_email },
                        { restoreCode: restoreCode }
                    ]
                }
            });
            if (!(response && response.length > 0)) {
                throw new Error('El código de recuperación no es válido');
            }
            return response[0];
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde")
        }
    }

    async getUserInfo(id) {
        try {
            const response = await this.model.findAll({
                attributes: {
                    exclude: [
                        'password',
                        'disabled',
                        'firstLogin',
                        'restoreCode'
                    ]
                },
                where: {
                    [Op.and]: [
                        { id: id },
                        { disabled: 0 }
                    ]
                }
            });
            if (!(response && response.length > 0)) {
                throw new Error('No se encontró a ningun usuario');
            }
            return response[0];
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    }

    async getUsers() {
        try {
            const instances = await this.model.findAll({ 
                attributes: ['id', 'nombre', 'email', 'role'], 
                where: { disabled: 0 }
            });
            return instances;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async getUser(id) {
        try {
            const usersFound = await this.model.findOne({
                attributes: ['id', 'nombre', 'email', 'role'],
                where: {
                    [Op.and]: [
                        { id: id },
                        { disabled: 0 }
                    ]
                }
            });

            if (!usersFound) {
                throw new Error('No se encontró a ningun usuario');
            }
            return usersFound;
        } catch (error) {//Enviar un objeto
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    };

    async enableUser(id) {
        try {
            const user = await findOne(id);
            if (!user) {
                throw new Error('No se encontró a ningun usuario');
            }
            await user.update({ disabled: 0 });
            return true;
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    }

    async disableUser(id) {
        try {
            const user = await findOne(id);
            if (!user) {
                throw new Error('No se encontró a ningun usuario');
            }
            await user.update({ disabled: 1 });
            return true;
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    }

    async requestRecoveryCode(email) {
        try {
            const usersFound = await this.model.findOne({ where: { email } });
            if (!usersFound) {
                throw new Error('No se encontró a ningún usuario');
            }

            const restoreCode = utils.generateRecoveryCode(5);

            const recoveryTemplate = (await readTemplateByPath('recovery.html')).replace('RESTORECODE', restoreCode);
            const emailPromise = new Promise((resolve, reject) => {
                transporter.sendMail(
                    {
                        from: `UNITEC ${process.env.EMAIL_USER}`,
                        to: email,
                        subject: "Código de Recuperación",
                        html: recoveryTemplate
                    },
                    async (error, info) => {
                        if (error) { 
                            return reject(error); 
                        }
                        try {
                            await usersFound.update({ restoreCode });
                            resolve();
                        } catch (updateError) {
                            reject(updateError);
                        }
                    }
                );
            });

            await emailPromise;
            return utils.encrypt(usersFound.id + "");
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    }

    async requestPasswordChange(restorePassword) {
        const { user_email, restoreCode, password } = restorePassword;

        try {
            const usersFound = await this.model.findOne({ where: {
				[Op.and]: [
					{ email: user_email },
					{ restoreCode: restoreCode }
				]
			} });

            if (!usersFound) {
                throw new Error('No se encontró a ningún usuario');
            }

            if (usersFound.password !== password) {
				if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/)) {
					await usersFound.update({ restoreCode: '0', password });
					return true;
				} else {
					throw new Error('No se encontró a ningún usuario');
				}
			} else {
				throw new Error('No se encontró a ningún usuario');
			}
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.")
        }
    }

    async requestPasswordChangeFirstLogin(restorePassword) {
        const { id, password } = restorePassword;

        try {
            const usersFound = await this.model.findOne({ 
                attributes: ['email', 'password'],
                where: {
                    [Op.and]: [
                        { id: id },
                        { firstLogin: 1 }
                    ]
                }
            });

            if (!usersFound) {
                throw new Error('No se encontró a ningún usuario');
            }

            if (usersFound.password !== password) {
				if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/)) {
					await usersFound.update({ restoreCode: '0', password });
					return true;
				} else {
					throw new Error('No se encontró a ningún usuario');
				}
			} else {
				throw new Error('No se encontró a ningún usuario');
			}
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.");
        }
    }

    async insertUser(user) {
        const { name, user_email, password, confirm_password } = user;
        try {
            const usersFound = await this.model.findOne({
                where: {
                    [Op.and]: [
                        { email: user_email },
                        { disabled: 0 }
                    ]
                }
            });

            if (usersFound) {
                throw new Error('El correo ingresado esta siendo usado en otra cuenta');
            }

            if (password === confirm_password) {
                if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/)) {
					let credentialsTemplate = await readTemplateByPath('credentials.html');
						credentialsTemplate = credentialsTemplate.replace('USERNAME', name);
						credentialsTemplate = credentialsTemplate.replace('USERMAIL', user_email);
						credentialsTemplate = credentialsTemplate.replace('USERPASS', password);
                    const emailPromise = new Promise((resolve, reject) => {
                        transporter.sendMail(
                            {
                                from: `UNITEC ${process.env.EMAIL_USER}`,
                                to: user_email,
                                subject: "Credenciales de Usuario",
                                html: credentialsTemplate
                            },
                            async (error, info) => {
                                if (error) { 
                                    return reject(error); 
                                }
                                try {
                                    await this.model.create({nombre: name, email: user_email, password});
                                    resolve();
                                } catch (updateError) {
                                    reject(updateError);
                                }
                            }
                        );
                    });

                    await emailPromise;

                    return true;
                } else {
                    throw new Error('No se encontró a ningún usuario');
                }
            } else {
                throw new Error('No se encontró a ningún usuario');
            }
        } catch (error) {
            throw new Error("Error de Servidor. Intente de nuevo más tarde.");
        }
    }

    async login(credentials) {
        console.log("Cuba: ");

        const { email, password } = credentials;
        try {
            const usersFound = await this.model.findOne({
                where: {
                    [Op.and]: [
                        { email: email },
                        { disabled: 0 }
                    ]
                }
            });

            if (!usersFound) {
                throw new Error('El usuario con el cual está intentando acceder no existe');
            }

            const credentialsResult = await usersFound.validPassword(password, usersFound.dataValues.password);

            if (!credentialsResult) {
                throw new Error('Combinación de usuario y contraseña incorrectos');
            }

            const token = jwt.sign({
                id: usersFound.id,
                role: usersFound.role,
                name: usersFound.name,
            }, process.env.TOKEN_SECRET_KEY);

            const firstLogin = (usersFound.firstLogin === 1);

            return {
                auth: true, 
                firstLogin,
                id: usersFound.id,//utils.encrypt(usersFound.id + ""),
                name: usersFound.name,
                email: usersFound.email,
                role: usersFound.role,
                token
            };
        } catch (error) {
            console.log("Error: ");
            console.log(error);
            throw new Error("Error de Servidor. Intente de nuevo más tarde.");
        }
    }

}

module.exports = AuthService;