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
        res.status(200).render("login");
    },
    comercialPage: (req, res) => {
        fs.readdir(path.join(__dirname, '../public/uploads/comercial'), (err, archivos) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).render("comercial", { archivos, url });
        });
    },
    recursosHumanosPage: (req, res) => {
        fs.readdir(path.join(__dirname, '../public/uploads/recursos-humanos'), (err, archivos) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).render("recursosHumanos", { archivos, url });
        });
    },

    // Access
    singUp: async (req, res) => {
        const { username, rol, password } = req.body;
        
        /*
        const validate_rol = await Rol.findOne({name: rol});
        if(!validate_rol) return res.status(400).json({ message: "Seleccione un rol invalido"});
        */

        await new User({
            userName: username,
            /*
            rol: validate_rol._id,
            */
            rol: rol,
            password: await User.encryptPassword(password)
        }).save();

        const users = await User.find().lean();
        /*
        const users = await User.find().populate("Roles").lean();
        */
        //res.status(201).redirect("/api/admin/dashboard");
        //res.status(201).render("dashboard", {users});
        res.status(201).json({ message: "Usuario Creado"});
    },
    singIn:  async (req, res) => {
    
        const token = jwt.sign({id: req.userId}, secretKey, {
            expiresIn: '1h'
        });

        switch(req.userRol){
            case "Admin":
                res.status(200).json({
                    url: "/api/admin/dashboard",
                    token: token
                });
                //res.status(200).redirect(`/api/admin/dashboard/?${token}`);
                break;
            case "RecursosHumanos":
                res.status(200).json({
                    url: "/api/auth/recursos-humanos",
                    token: token
                });
                break;
            case "Comercial":
                res.status(200).json({
                    url: "/api/auth/comercial",
                    token: token
                });
                break;
            default:
                res.status(400).json({ message: "Error, usuario defectuoso" });
        }
        
    },
    logOut: async (req, res) => {
        const ExpiredToken = req.headers["x-access-token"];
        await User.findOneAndUpdate( { _id: req.userId }, { $push: { blackListToken: ExpiredToken }});
        res.status(200).send({message: "Usuario deslogeado"});
    },

    validateToken: async (req, res) => {
        res.status(200).send("Athorized");
    }

}

module.exports = controller;