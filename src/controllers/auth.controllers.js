'use strict';

const User = require("../models/users.model");
//const Rol = require("../models/roles.model");
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require("fs");
const { AsyncLocalStorage } = require("async_hooks");

const asyncLocalStorage = new AsyncLocalStorage();

const { secretKey, url } = require("../config/keys");

const controller = {

    // Pages render
    singInPage: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).render("login");
        } catch (err) {
            console.log(`[singInPage][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[singInPage][Execution Time]: ${Date.now() - start}`);
    },
    direccionGeneralPage: (req, res) => {
        const start = Date.now();
        console.log("xd")
        try {
            fs.readdir(path.join(__dirname, '../public/uploads/direccion-general'), (err, archivos) => {
                if (err) {
                    console.log(`[direccionGeneralPage][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                res.status(200).render("direccionGeneral", { archivos, url });//·crear archivo hbs
            });
        } catch (err) {
            console.log(`[direccionGeneralPage][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[direccionGeneralPage][Execution Time]: ${Date.now() - start}`);
    },
    administracionPage: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/administracion'), (err, archivos) => {
                if (err) {
                    console.log(`[administracionPage][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                console.log(`[administracionPage][archivos]: ${JSON.stringify(archivos)}`);
                res.status(200).render("administracion", { archivos, url });//·crear archivo hbs
            });
        } catch (err) {
            console.log(`[administracionPage][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[administracionPage][Execution Time]: ${Date.now() - start}`);
    },
    recursosHumanosPage: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/recursos-humanos'), (err, archivos) => {
                if (err) {
                    console.log(`[recursosHumanosPage][error fs]: ${JSON.stringify(err)}`);
                    return;// cambiar return por throw
                }
                res.status(200).render("recursosHumanos", { archivos, url });
            });
        } catch (err) {
            console.log(`[recursosHumanosPage][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[recursosHumanosPage][Execution Time]: ${Date.now() - start}`);
    },
    comercial1Page: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial1'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial1Page][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                res.status(200).render("comercial1", { archivos, url });//·cambiar nombre a archivo hbs
            });
        } catch (err) {
            console.log(`[comercial1Page][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[comercial1Page][Execution Time]: ${Date.now() - start}`);
    },
    comercial2Page: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial2'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial2Page][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                res.status(200).render("comercial2", { archivos, url });//·crear archivo hbs
            });
        } catch (err) {
            console.log(`[comercial2Page][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[comercial2Page][Execution Time]: ${Date.now() - start}`);
    },
    comercial3Page: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial3'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial3Page][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                res.status(200).render("comercial3", { archivos, url });//·crear archivo hbs
            });
        } catch (err) {
            console.log(`[comercial3Page][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[comercial3Page][Execution Time]: ${Date.now() - start}`);
    },


    // Access
    singUp: async (req, res) => {
        const start = Date.now();

        try {
            const { username, rol, password } = req.body;
            await new User({
                userName: username,
                rol: rol,
                password: await User.encryptPassword(password)
            }).save();
           
            console.log(`[singUp][Usuario creado]`);
            res.status(201).json({ message: "Usuario Creado" });
        } catch (err) {
            console.log(`[singUp][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[singUp][Execution Time]: ${Date.now() - start}`);
    },
    singIn: async (req, res) => {
        const start = Date.now();

        try {
            const token = jwt.sign({ id: req.userId }, secretKey, {
                expiresIn: '1h'
            });

            console.log(`[singIn][token]: ${token}`);
            console.log(`[singIn][rol]: ${JSON.stringify(req.userRol)}`);

            switch (req.userRol) {
                case "Admin":
                    res.status(200).json({
                        url: "/api/admin/dashboard",
                        token: token
                    });
                    break;
                case "DireccionGeneral":
                    res.status(200).json({
                        url: "/api/auth/direccion-general",
                        token: token
                    });
                    break;
                case "Administracion":
                    res.status(200).json({
                        url: "/api/auth/administracion",
                        token: token
                    });
                    break;
                case "RecursosHumanos":
                    res.status(200).json({
                        url: "/api/auth/recursos-humanos",
                        token: token
                    });
                    break;
                case "Comercial1":
                    res.status(200).json({
                        url: "/api/auth/comercial1",
                        token: token
                    });
                    break;
                case "Comercial2":
                    res.status(200).json({
                        url: "/api/auth/comercial2",
                        token: token
                    });
                    break;
                case "Comercial3":
                    res.status(200).json({
                        url: "/api/auth/comercial3",
                        token: token
                    });
                    break;
                default:
                    res.status(400).json({ message: "Error, usuario defectuoso" });
            }
        } catch (err) {
            console.log(`[singIn][error]: ${err}`);
            console.log(`[singIn][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[singIn][Execution Time]: ${Date.now() - start}`);

    },
    logOut: async (req, res) => {
        const start = Date.now();

        try {
            console.log(`[logOut][logOut user]: ${req.userId}`);
            const ExpiredToken = req.headers["x-access-token"];
            await User.findOneAndUpdate({ _id: req.userId }, { $push: { blackListToken: ExpiredToken } });
            res.status(200).send({ message: "Usuario deslogeado" });
        } catch (err) {
            console.log(`[logOut][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[logOut][Execution Time]: ${Date.now() - start}`);
    },

    validateToken: async (req, res) => {
        const start = Date.now();

        try {
            console.log(`[validateToken][Validating]`);
            res.status(200).send("Athorized");
        } catch (err) {
            console.log(`[validateToken][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });
        }
        console.log(`[validateToken][Execution Time]: ${Date.now() - start}`);
    }

}

module.exports = controller;