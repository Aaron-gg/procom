const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/keys');

const verifySession = async (req, res, next) => {
    const start = Date.now();

    try {
        const token = req.headers["x-access-token"] ? req.headers["x-access-token"] : req.query.token;
        console.log(`[verifySession][token]: ${token}`);
        if (!token) return res.status(404).json({ message: "No token provided" });

        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.id;

        const user = await User.findById(decoded.id, { password: 0 });
        console.log(`[verifySession][user]: ${JSON.stringify(user)}`);
        if (!user) return res.status(401).json({ message: 'No user found' });

        const token_in_blackList = user.blackListToken.includes(token);
        console.log(`[verifySession][token_in_blackList]: ${token_in_blackList}`);
        if (token_in_blackList) return res.status(403).json({ message: 'Session expired' });

        console.log(`[verifySession][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifySession][verify]`);
        next();
    } catch (err) {
        console.log(`[verifySession][error]: ${JSON.stringify(err)}`);
        return res.status(403).json({ message: 'Unauthorized or session expired' });
    }
}

const verifyRolAdmin = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolAdmin][user rol]: ${user.rol}`);
        if (user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Admin' });

        console.log(`[verifyRolAdmin][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolAdmin][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolAdmin][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolDG = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolDG][user rol]: ${user.rol}`);
        if (user.rol != "DireccionGeneral" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Direccion General or Admin' });

        console.log(`[verifyRolDG][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolDG][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolDG][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolAdministracion = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolAdministracion][user rol]: ${user.rol}`);
        if (user.rol != "Administracion" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Administracion or Admin' });

        console.log(`[verifyRolAdministracion][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolAdministracion][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolAdministracion][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolRH = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolRH][user rol]: ${user.rol}`);
        if (user.rol != "RecursosHumanos" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Recursos Humanos or Admin' });

        console.log(`[verifyRolRH][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolRH][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolRH][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolComercial1 = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolComercial1][user rol]: ${user.rol}`);
        if (user.rol != "Comercial1" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Comercial1 or Admin' });

        console.log(`[verifyRolComercial1][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolComercial1][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolComercial1][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolComercial2 = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolComercial2][user rol]: ${user.rol}`);
        if (user.rol != "Comercial2" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Comercial2 or Admin' });

        console.log(`[verifyRolComercial2][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolComercial2][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolComercial2][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyRolComercial3 = async (req, res, next) => {
    const start = Date.now();

    try {
        const user = await User.findById(req.userId);
        console.log(`[verifyRolComercial3][user rol]: ${user.rol}`);
        if (user.rol != "Comercial3" && user.rol != "Admin") return res.status(403).json({ message: 'Unauthorized, only Comercial3 or Admin' });

        console.log(`[verifyRolComercial3][Execution Time]: ${Date.now() - start}`);
        console.log(`[verifyRolComercial3][Verify Admin]`);
        next();

    } catch (err) {
        console.log(`[verifyRolComercial3][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const clearBlackList = async (req, res, next) => {
    const start = Date.now();

    try {
        console.log(`[clearBlackList][Limpiando BlackList de usuario]`);
        const user = await User.findById(req.userId);
        const range = user.blackListToken.length;
        let n = 0;
        console.log(`[clearBlackList][Tamaño blackList de usuario]: ${range}`);
        for (let i = 0; i < range; i++) {
            try {
                jwt.verify(element, secretKey);
            }
            catch (error) {
                user.blackListToken.splice(n, 1);
                n--;
            }
            n++;
        }
        await User.findByIdAndUpdate(req.userId, { blackListToken: user.blackListToken });

        console.log(`[clearBlackList][BlackList de usuario limpia]`);
        console.log(`[clearBlackList][Execution Time]: ${Date.now() - start}`);
        next();

    } catch (err) {
        console.log(`[clearBlackList][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifyCreateUser = async (req, res, next) => {
    const start = Date.now();

    try {
        req.userId = req.params.id;

        const { username, rol, password, password_conf } = req.body;
        if (password !== password_conf) return res.status(401).json({ message: "Las contraseñas no coinciden" });

        const same_user = await User.findOne({ userName: username });
        if (same_user) return res.status(401).json({ message: "El nombre de usuario ya existe" });

        console.log(`[verifyCreateUser][rol]: ${rol}`);

        if (
            rol !== "DireccionGeneral" &&
            rol !== "Administracion" &&
            rol !== "RecursosHumanos" &&
            rol !== "Comercial1" &&
            rol !== "Comercial2" &&
            rol !== "Comercial3"
        ) return res.status(400).json({ message: "Seleccione un rol valido" });

        console.log(`[verifyCreateUser][Execution Time]: ${Date.now() - start}`);
        next();

    } catch (err) {
        console.log(`[verifyCreateUser][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

const verifylogin = async (req, res, next) => {
    const start = Date.now();

    try {
        const userFound = await User.findOne({ userName: req.body.username });
        console.log(`[verifylogin][Usuario encontrado]: ${JSON.stringify(userFound)}`);
        if (!userFound) return res.status(401).json({ message: "Usuario no encontrado" });

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        if (!matchPassword) return res.status(403).json({ message: "Contraseña invalida" });

        req.userId = userFound._id;
        req.userRol = userFound.rol;

        console.log(`[verifylogin][Execution Time]: ${Date.now() - start}`);
        next()
    } catch (err) {
        console.log(`[verifylogin][error]: ${JSON.stringify(err)}`);
        return res.status(500).json({ message: 'Error en servidor' });
    }
}

module.exports = {
    verifySession,
    verifyRolAdmin,
    verifyRolDG,
    verifyRolAdministracion,
    verifyRolRH,
    verifyRolComercial1,
    verifyRolComercial2,
    verifyRolComercial3,
    clearBlackList,
    verifyCreateUser,
    verifylogin
}