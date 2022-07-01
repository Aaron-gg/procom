const Role = require("../models/roles.model");

const createRoles = async () => {
    try{
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: "Admin"}).save(),
            new Role({name: "RecursosHumanos"}).save(),
            new Role({name: "Comercial"}).save(),
        ]);

        return console.log(values);
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    createRoles
}