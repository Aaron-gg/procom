const Role = require("../models/roles.model");

const createRoles = async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: "Admin"}).save(),
            new Role({name: "Dirección General"}).save(),
            new Role({name: "Administración"}).save(),
            new Role({name: "RecursosHumanos"}).save(),
            new Role({name: "Comercial1"}).save(),
            new Role({name: "Comercial2"}).save(),
            new Role({name: "Comercial3"}).save(),
        ]);

        return console.log(values);
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    createRoles
}