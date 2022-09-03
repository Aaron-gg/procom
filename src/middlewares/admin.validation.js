const User = require('../models/users.model');

const verifyExistUser = async (req, res, next) => {
    const start = Date.now();

    try {
        req.userId = req.params.id;
        const user = await User.findById(req.userId);

        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        console.log(`[verifyExistUser][Execution Time]: ${Date.now() - start}`);
        next();
    } catch (error) {
        console.log(`[verifyExistUser][error]: ${JSOn.stringify(err)}`);
        return res.status(403).json({ message: 'Unauthorized or session expired' });
    }
}

const verifyEditUser = async (req, res, next) => {
    const start = Date.now();

    try {
        const { username, rol, password, password_conf } = req.body;

        console.log(`[verifyEditUser][rol]: ${rol}`);

        if (
            rol !== "DireccionGeneral" && 
            rol !== "Administracion" && 
            rol !== "RecursosHumanos" && 
            rol !== "Comercial1" &&
            rol !== "Comercial2" &&
            rol !== "Comercial3" 
        ) return res.status(400).json({ message: "Seleccione un rol valido" });

        let user = await User.findById(req.userId);
        const same_user = await User.findOne({ userName: username });
        if (same_user && user.userName !== username) return res.status(400).json({ message: "El nombre de usuario ya existe" });

        if (password) {
            if (password !== password_conf) return res.status(400).json({ message: "Las contraseñas no coinciden" });
            //user.password = await User.encryptPassword(password);
            await User.findByIdAndUpdate(req.userId, {
                password: await User.encryptPassword(password),
            });
        }

        console.log(`[verifyEditUser][Execution Time]: ${Date.now() - start}`);
        next()
    } catch (error) {
        console.log(`[verifyEditUser][error]: ${JSOn.stringify(err)}`);
        return res.status(403).json({ message: 'Unauthorized or session expired' });
    }

}

module.exports = {
    verifyExistUser,
    verifyEditUser
}