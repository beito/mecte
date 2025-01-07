const express = require('express');

const AuthService = require('../services/auth.service');
const utils = require("../utils/misc/crypto");

const router = express.Router();
const service = new AuthService();

router.get("/validateCode", async (req, res, next) => {
    try {
        const recoveryCode = req.query;
        const recoveryCodeAcquired = await service.validateRecoveryCode(recoveryCode);
        res.status(200).json({
            id: utils.encrypt(recoveryCodeAcquired.id + ""),
            title: "Código de recuperación válido",
            message: 'El código de recuperación se validó correctamente'
        });
    } catch (error) {
        next(error);
    }
});

router.get("/getUserInfo", async (req, res, next) => {
    try {
        const { id } = req.query;
        const userInformation = await service.getUserInfo(id);
        res.status(200).json({
            result: userInformation,
            title: "Información del Usuario Disponible",
            message: ''
        });
    } catch (error) {
        next(error);
    }
});

router.get("/getUser", async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = await service.getUser(id);
        res.status(200).json({
            result: user,
            title: "Usuario Disponible",
            message: ''
        });
    } catch (error) {
        next(error);
    }
});

router.get('/getUsers', async (req, res, next) => {
    try {
      const users = await service.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
});

router.put("/enableUser", async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = await service.enableUser(id);
        if (user) {
            res.status(200).json({
                valid: true,
                title: "Usuario activado con éxito", 
                message: 'Usuario activado con éxito'
            });
        } else {
            next(new Error("Error de Servidor. Intente de nuevo más tarde."));
        }
    } catch (error) {
        next(error);
    }
});

router.put("/disableUser", async (req, res, next) => {
    try {
        const { id } = req.query;
        const user = await service.enableUser(id);
        if (user) {
            res.status(200).json({
                valid: true,
				title: "Usuario desactivado con éxito", 
				message: 'Usuario desactivado con éxito'
            });
        } else {
            next(new Error("Error de Servidor. Intente de nuevo más tarde."));
        }
    } catch (error) {
        next(error);
    }
});

router.put("/recoveryCode", async (req, res, next) => {
    try {
        const { email } = req.body;
        const encriptedID = await service.requestRecoveryCode(email);
        res.status(200).json({
            id: encriptedID,
            title: "Código de Recuperación Generado", 
            message: 'El código de recuperación se generó y envió a su correo de forma satisfactoria'
        });
    } catch (error) {
        next(error);
    }
});

router.put("/changePassword", async (req, res, next) => {
    try {
        await service.requestPasswordChange(req.body);
        res.status(200).json({
            valid: true,
            title: "Contraseña Cambiada Exitosamente", 
            message: 'La contraseña se ha cambiado de forma satisfactoria'
        });
    } catch (error) {
        next(error);
    }
});

router.put("/changePasswordFirstLogin", async (req, res, next) => {
    try {
        await service.requestPasswordChangeFirstLogin(req.body);
        res.status(200).json({
            valid: true,
            title: "Contraseña Cambiada Exitosamente", 
            message: 'La contraseña se ha cambiado de forma satisfactoria'
        });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const credentials = await service.login(req.body);
        res.status(200).json({
            data: credentials,
            title: "Inicio de Sesión", 
            message: ''
        });
    } catch (error) {
        next(error);
    }
});

router.post("/insertUser", async (req, res, next) => {
    try {
        await service.insertUser(req.body);
        res.status(201).json({
            valid: true,
            title: "Usuario Insertado correctamente", 
            message: 'Usuario Insertado correctamente'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
