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
        const start = Date.now();

        try {
            const users = await User.find({
                $or: [
                    { rol: "DireccionGeneral" },
                    { rol: "Administracion" },
                    { rol: "RecursosHumanos" },
                    { rol: "Comercial1" },
                    { rol: "Comercial2" },
                    { rol: "Comercial3" }
                ]
            }).lean();
            res.status(200).render("dashboard", { users, url });

        } catch (err) {
            console.log(`[home][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[home][Execution Time]: ${Date.now() - start}`);

    },

    // Users
    pageEditUser: async (req, res) => {
        const start = Date.now();

        try {
            const user = await User.findById(req.userId).lean();
            res.status(200).render("edit_user", { user, url });

        } catch (err) {
            console.log(`[pageEditUser][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[pageEditUser][Execution Time]: ${Date.now() - start}`);

    },
    editUser: async (req, res) => {
        const start = Date.now();

        try {
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
            res.status(201).json({ message: "Usuario Editado" });
            //res.status(200).redirect("/api/admin/dashboard");
            //res.status(200).render("dashboard", {users});
        } catch (err) {
            console.log(`[editUser][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[editUser][Execution Time]: ${Date.now() - start}`);
    },
    deleteUser: async (req, res) => {
        const start = Date.now();

        try {
            await User.findByIdAndDelete(req.userId);
            res.status(201).json({ message: "Usuario Eliminado" });

        } catch (err) {
            console.log(`[deleteUser][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[deleteUser][Execution Time]: ${Date.now() - start}`);
    },

    // Direccion General
    direccionGeneral: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/direccion-general'), (err, archivos) => {
                if (err) {
                    console.log(`[direccionGeneral][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("direccionGeneral_admin", { url, archivos });//·crear archivo hbs
            });
        } catch (err) {
            console.log(`[direccionGeneral][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[direccionGeneral][Execution Time]: ${Date.now() - start}`);
    },
    direccionGeneralUpload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });

        } catch (err) {
            console.log(`[direccionGeneralUpload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[direccionGeneralUpload][Execution Time]: ${Date.now() - start}`);
    },
    direccionGeneralDelete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/direccion-general/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[direccionGeneralDelete][error fs]: ${JSON.stringify(err)}`);
                    return;
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
        } catch (err) {
            console.log(`[direccionGeneralDelete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[direccionGeneralDelete][Execution Time]: ${Date.now() - start}`);
    },

    // Administracion
    administracion: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/administracion'), (err, archivos) => {
                if (err) {
                    console.log(`[administracion][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("administracion_admin", { url, archivos });//·crear archibo hbs
            });
        } catch (err) {
            console.log(`[administracion][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[administracion][Execution Time]: ${Date.now() - start}`);
    },
    administracionUpload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });
            //res.status(200).redirect("/api/admin/comercial-admin");
        } catch (err) {
            console.log(`[administracionUpload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[administracionUpload][Execution Time]: ${Date.now() - start}`);
    },
    administracionDelete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/administracion/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[administracionDelete][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
            //res.status(200).redirect("/api/admin/comercial-admin");
        } catch (err) {
            console.log(`[administracionDelete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[administracionDelete][Execution Time]: ${Date.now() - start}`);
    },

    // Recursos Humanos
    rh: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/recursos-humanos'), (err, archivos) => {
                if (err) {
                    console.log(`[rh][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("recursosHumanos_admin", { url, archivos });
            });
        } catch (err) {
            console.log(`[rh][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[rh][Execution Time]: ${Date.now() - start}`);
    },
    rhUpload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });
            //res.status(200).redirect("/api/admin/rh-admin");
        } catch (err) {
            console.log(`[rhUpload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[rhUpload][Execution Time]: ${Date.now() - start}`);
    },
    rhDelete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/recursos-humanos/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[rhDelete][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
            //res.status(200).redirect("/api/admin/rh-admin");
        } catch (err) {
            console.log(`[rhDelete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[rhDelete][Execution Time]: ${Date.now() - start}`);
    },

    // Comercial1
    comercial1: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial1'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial1][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("comercial1_admin", { url, archivos });
            });
        } catch (err) {
            console.log(`[comercial1][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial1][Execution Time]: ${Date.now() - start}`);
    },
    comercial1Upload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });
            //res.status(200).redirect("/api/admin/comercial1-admin");
        } catch (err) {
            console.log(`[comercial1Upload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial1Upload][Execution Time]: ${Date.now() - start}`);
    },
    comercial1Delete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/comercial1/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[comercial1Delete][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
            //res.status(200).redirect("/api/admin/comercial1-admin");
        } catch (err) {
            console.log(`[comercial1Delete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial1Delete][Execution Time]: ${Date.now() - start}`);
    },

    // Comercial2
    comercial2: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial2'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial2][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("comercial2_admin", { url, archivos });
            });
        } catch (err) {
            console.log(`[comercial2][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial2][Execution Time]: ${Date.now() - start}`);
    },
    comercial2Upload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });
            //res.status(200).redirect("/api/admin/comercial2-admin");
        } catch (err) {
            console.log(`[comercial2Upload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial2Upload][Execution Time]: ${Date.now() - start}`);
    },
    comercial2Delete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/comercial2/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[comercial2Delete][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
            //res.status(200).redirect("/api/admin/comercial2-admin");
        } catch (err) {
            console.log(`[comercial2Delete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial2Delete][Execution Time]: ${Date.now() - start}`);
    },

    // Comercial3
    comercial3: (req, res) => {
        const start = Date.now();

        try {
            fs.readdir(path.join(__dirname, '../public/uploads/comercial3'), (err, archivos) => {
                if (err) {
                    console.log(`[comercial3][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
                /*
                const archivosName = archivos.map((archivo) => {
                    return archivo.split(".")[1];
                });
                */
                res.status(200).render("comercial3_admin", { url, archivos });
            });
        } catch (err) {
            console.log(`[comercial3][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial3][Execution Time]: ${Date.now() - start}`);
    },
    comercial3Upload: (req, res) => {
        const start = Date.now();

        try {
            res.status(200).json({ message: "Archivo Cargado" });
            //res.status(200).redirect("/api/admin/comercial3-admin");
        } catch (err) {
            console.log(`[comercial3Upload][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial3Upload][Execution Time]: ${Date.now() - start}`);
    },
    comercial3Delete: (req, res) => {
        const start = Date.now();

        try {
            fs.unlink(path.join(__dirname, `../public/uploads/comercial3/${req.params.id}`), (err) => {
                if (err) {
                    console.log(`[comercial3Delete][error fs]: ${JSON.stringify(err)}`);
                    return;//·cambiar return por throw
                }
            });
            res.status(200).json({ message: "Archivo Eliminado" });
            //res.status(200).redirect("/api/admin/comercial3-admin");
        } catch (err) {
            console.log(`[comercial3Delete][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[comercial3Delete][Execution Time]: ${Date.now() - start}`);
    },

    // Admin
    admin: async (req, res) => {
        const start = Date.now();

        try {
            const { username, rol, password } = req.body;

            await new User({
                userName: username,
                rol: rol,
                password: await User.encryptPassword(password)
            }).save();

            res.status(201).send("Admin creado");
        } catch (err) {
            console.log(`[admin][error]: ${JSON.stringify(err)}`);
            res.status(500).json({ message: 'Error en servidor' });

        }
        console.log(`[admin][Execution Time]: ${Date.now() - start}`);
    }
}

module.exports = controller;