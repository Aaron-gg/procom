'use strict';

const router = require("express").Router();

const { 
    verifySession,
    verifyRolDG,
    verifyRolAdministracion,
    verifyRolRH,
    verifyRolComercial1,
    verifyRolComercial2,
    verifyRolComercial3, 
} = require("../middlewares/auth.validation");

const uploadController = require("../controllers/upload.controllers");

router.get("/direccion-general/:file?", [verifySession, verifyRolDG], uploadController.direccionGeneral);

router.get("/administracion/:file?", [verifySession, verifyRolAdministracion], uploadController.administracion);

router.get("/recursos-humanos/:file?", [verifySession, verifyRolRH], uploadController.recursosHumanos);

router.get("/comercial1/:file?", [verifySession, verifyRolComercial1], uploadController.comercial1);

router.get("/comercial2/:file?", [verifySession, verifyRolComercial2], uploadController.comercial2);

router.get("/comercial3/:file?", [verifySession, verifyRolComercial3], uploadController.comercial3);

module.exports = router;