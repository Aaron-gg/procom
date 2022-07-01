'use strict';

const controller = {
    recursosHumanos: (req, res, next) => {
        const file = req.params.file;
        res.status(200).render("filesRH", {file});
        next();
    },

    comercial: (req, res, next) => {
        console.log("comercial OK!!");
        /*
        const file = req.params.file;
        res.status(200).render("filesComercial", {file});
        next();*/
    }
}

module.exports = controller;