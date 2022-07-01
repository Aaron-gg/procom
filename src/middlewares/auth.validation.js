const express = require("express")
const app = express();
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/keys');

const verifySession = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(404).json({ message: "No token provided"});
        
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.id;

        const user = await User.findById(decoded.id, {password: 0});
        if(!user) return res.status(401).json({ message: 'No user found'});

        if(user.blackListToken.includes(token)) return res.status(403).json({ message: 'Session expired'});
        /*
        app.use(express.static(path.join(__dirname, '../public')));
        */
        next();
    }
    catch (error){
        return res.status(403).json({ message: 'Unauthorized or session expired'});
    }
}

const verifyRolAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if(user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Admin'});
    next();
}

const verifyRolComercial = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if(user.rol != "Comercial" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Comercial or Admin'});
    next();
}

const verifyRolRH = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if(user.rol != "RecursosHumanos" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Recursos Humanos or Admin'});
    next();
}

const clearBlackList = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const range = user.blackListToken.length;
    let n = 0;
    for(let i = 0; i < range; i++) {
        try{
            jwt.verify(element, secretKey);
        }
        catch(error){
            user.blackListToken.splice(n, 1);
            n--;
        }
        n++;
    }
    await User.findByIdAndUpdate(req.userId, {blackListToken: user.blackListToken});
    next();
}

const verifyCreateUser = async (req, res, next) => {

    req.userId = req.params.id;

    const { username, rol, password, password_conf } = req.body;
    if (password !== password_conf) return res.status(401).json({ message: "Las contraseñas no coinciden" });

    const same_user = await User.findOne({ userName: username });
    if (same_user) return res.status(401).json({ message: "El nombre de usuario ya existe" });

    if (rol !== "RecursosHumanos" && rol !== "Comercial") return res.status(401).json({ message: "Seleccione un rol invalido" });

    next();
}

const verifylogin = async (req, res, next) => {
    
    const userFound = await User.findOne({ userName: req.body.username });
    if (!userFound) return res.status(401).json({message: "Usuario no encontrado"});
    
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(403).json({message: "Contraseña invalida"});

    req.userId = userFound._id;
    req.userRol = userFound.rol;
    
    next()
}

module.exports = {
    verifySession,
    verifyRolAdmin,
    verifyRolComercial,
    verifyRolRH,
    clearBlackList,
    verifyCreateUser,
    verifylogin
}