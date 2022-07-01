'use strict';

const router = require("express").Router();

const validateData = require("../middlewares/validateData");
const loginShemaValid = require("../middlewares/schemasValidation/loginShema.validation");

const { verifySession, clearBlackList, verifyRolAdmin, verifyRolComercial, verifyRolRH, verifylogin } = require("../middlewares/auth.validation");

const authController = require("../controllers/auth.controllers");

// Pages render
router.get("/singin-page", authController.singInPage);

router.get("/comercial/:file?", authController.comercialPage);

router.get("/recursos-humanos/:file?", authController.recursosHumanosPage);

// Auth
router.post("/singin", [validateData(loginShemaValid), verifylogin], authController.singIn);

router.post("/logout", [verifySession, clearBlackList], authController.logOut);

router.get("/t/admin", [verifySession, verifyRolAdmin], authController.validateToken);

router.get("/t/comercial", [verifySession, verifyRolComercial], authController.validateToken);

router.get("/t/rh", [verifySession, verifyRolRH], authController.validateToken);


module.exports = router;