'use strict';

const router = require("express").Router();

const { verifySession, verifyRolComercial, verifyRolRH } = require("../middlewares/auth.validation");
const uploadController = require("../controllers/upload.controllers");

//router.get("/recursos-humanos/:file?", [verifySession, verifyRolRH], uploadController.recursosHumanos);

//router.get("/comercial/:file?", [verifySession, verifyRolComercial], uploadController.comercial);


module.exports = router;