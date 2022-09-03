'use strict';

const router = require("express").Router();

const validateData = require("../middlewares/validateData");
const loginShemaValid = require("../middlewares/schemasValidation/loginShema.validation");

const {
    verifySession, 
    clearBlackList, 
    verifyRolAdmin,
    verifyRolDG,
    verifyRolAdministracion,
    verifyRolRH,
    verifyRolComercial1,
    verifyRolComercial2,
    verifyRolComercial3, 
    verifylogin 
} = require("../middlewares/auth.validation");

const authController = require("../controllers/auth.controllers");

// Pages render
router.get("/singin-page", authController.singInPage);

router.get("/direccion-general/:file?", authController.direccionGeneralPage);

router.get("/administracion/:file?", authController.administracionPage);

router.get("/recursos-humanos/:file?", authController.recursosHumanosPage);

router.get("/comercial1/:file?", authController.comercial1Page);

router.get("/comercial2/:file?", authController.comercial2Page);

router.get("/comercial3/:file?", authController.comercial3Page);

// Auth
router.post("/singin", [validateData(loginShemaValid), verifylogin], authController.singIn);

router.post("/logout", [verifySession, clearBlackList], authController.logOut);

router.get("/t/admin", [verifySession, verifyRolAdmin], authController.validateToken);

router.get("/t/dg", [verifySession, verifyRolDG], authController.validateToken);

router.get("/t/administracion", [verifySession, verifyRolAdministracion], authController.validateToken);

router.get("/t/rh", [verifySession, verifyRolRH], authController.validateToken);

router.get("/t/comercial1", [verifySession, verifyRolComercial1], authController.validateToken);

router.get("/t/comercial2", [verifySession, verifyRolComercial2], authController.validateToken);

router.get("/t/comercial3", [verifySession, verifyRolComercial3], authController.validateToken);


module.exports = router;