const User = require('../models/users.model');

const verifyExistUser = async (req, res, next) => {
    
    req.userId = req.params.id;
    const user = await User.findById(req.userId);

    if(!user) return res.status(400).json({ message: "Usuario no encontrado"});

    next();
}

const verifyEditUser = async (req, res, next) => {

    const { username, rol, password, password_conf } = req.body;
    if(rol !== "RecursosHumanos" && rol !== "Comercial") return res.status(400).json({ message: "Seleccione un rol invalido"});
    
    let user = await User.findById(req.userId);
    const same_user = await User.findOne({userName: username});
    if(same_user && user.userName !== username) return res.status(400).json({ message: "El nombre de usuario ya existe"});

    if(password){
        if(password !== password_conf) return res.status(400).json({ message: "Las contraseñas no coinciden"});
        //user.password = await User.encryptPassword(password);
        await User.findByIdAndUpdate(req.userId, {
            password: await User.encryptPassword(password),
        });
    }

    next()
}

module.exports = {
    verifyExistUser,
    verifyEditUser
}