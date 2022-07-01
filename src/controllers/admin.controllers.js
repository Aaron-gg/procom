'use strict';

const User = require("../models/users.model");
const path = require("path");
const fs = require("fs");

const { url } = require("../config/keys");

const controller = {
    home: async (req, res) => {
        /*
        fs.readdir(path.join(__dirname, '../public/uploads'), (err, directorios) => {
            if (err) {
                console.log(err);
                return;
            }
            //res.render("dashboard", { directorios });
        });
        */
        /*
        const users = await User.find().populate('Roles').lean();
        */

        const users = await User.find({$or: [{rol: "RecursosHumanos"}, {rol: "Comercial"}]}).lean();
        res.status(200).render("dashboard", { users, url });
    },

    // Users
    pageEditUser: async (req, res) => {
        const user = await User.findById(req.userId).lean();

        res.status(200).render("edit_user", {user, url});
    },
    editUser: async (req, res) => {

        const { username, rol } = req.body;
        
        let user = await User.findById(req.userId);

        /*
        const validate_rol = await Rol.findOne({name: rol});
        if(!validate_rol) return res.status(400).json({ message: "Seleccione un rol invalido"});
        */
        
        user = {
            userName: username,
            rol: rol,
        }

        await User.findByIdAndUpdate(req.userId, user);

        //const users = await User.find().lean();
        res.status(201).json({ message: "Usuario Editado"});
        //res.status(200).redirect("/api/admin/dashboard");
        //res.status(200).render("dashboard", {users});
    },
    deleteUser: async (req, res) => {

        await User.findByIdAndDelete(req.userId);

        const users = await User.find().lean();
        res.status(201).json({ message: "Usuario Eliminado"});
        //res.status(200).redirect("/api/admin/dashboard");
        //res.status(201).render("dashboard", {users});
    },

    // Comercial
    comercial: (req, res) => {
        fs.readdir(path.join(__dirname, '../public/uploads/comercial'), (err, archivos) => {
            if (err) {
                console.log(err);
                return;
            }
            /*
            const archivosName = archivos.map((archivo) => {
                return archivo.split(".")[1];
            });
            */
            res.status(200).render("comercial_admin", { url, archivos });
        });
    },
    comercialUpload: (req, res) => {
        res.status(200).json({message: "Archivo Cargado"});
        //res.status(200).redirect("/api/admin/comercial-admin");
    },
    comercialDelete: (req, res) => {
        fs.unlink(path.join(__dirname, `../public/uploads/comercial/${req.params.id}`), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        res.status(200).json({message: "Archivo Eliminado"});
        //res.status(200).redirect("/api/admin/comercial-admin");
    },

    // Recursos Humanos
    rh: (req, res) => {
        fs.readdir(path.join(__dirname, '../public/uploads/recursos-humanos'), (err, archivos) => {
            if (err) {
                console.log(err);
                return;
            }
            /*
            const archivosName = archivos.map((archivo) => {
                return archivo.split(".")[1];
            });
            */
            res.status(200).render("recursosHumanos_admin", { url, archivos });
        });
    },
    rhUpload: (req, res) => {
        res.status(200).json({message: "Archivo Cargado"});
        //res.status(200).redirect("/api/admin/rh-admin");
    },
    rhDelete: (req, res) => {
        fs.unlink(path.join(__dirname, `../public/uploads/recursos-humanos/${req.params.id}`), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        res.status(200).json({message: "Archivo Eliminado"});
        //res.status(200).redirect("/api/admin/rh-admin");
    },

    // Admin
    admin: async (req, res) => {
        const { username, rol, password } = req.body;
        
        await new User({
            userName: username,
            rol: rol,
            password: await User.encryptPassword(password)
        }).save();
        
        res.status(201).send("Admin creado");
    }
}

module.exports = controller;