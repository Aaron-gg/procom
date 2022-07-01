'use strict';

const router = require("express").Router();

const validateData = require("../middlewares/validateData");
const userShemaValid = require("../middlewares/schemasValidation/createUserShema.validation");
//const userEdShemaValid = require("../middlewares/schemasValidation/editUserShema.validation");

const { verifyExistUser, verifyEditUser } = require("../middlewares/admin.validation");
const { verifySession, verifyRolAdmin, verifyCreateUser } = require("../middlewares/auth.validation");

const { uploadComercial, uploadReh } = require("../middlewares/multer");

const authController = require("../controllers/auth.controllers");
const adminController = require("../controllers/admin.controllers");

router.get("/dashboard", adminController.home);

// Users
router.post("/create-user", [verifySession, verifyRolAdmin, validateData(userShemaValid), verifyCreateUser], authController.singUp);

router.get("/edit-user/:id", verifyExistUser, adminController.pageEditUser);

router.put("/edit-user/:id", [verifySession, verifyRolAdmin, verifyExistUser, verifyEditUser], adminController.editUser);

router.delete("/delete-user/:id", [verifySession, verifyRolAdmin, verifyExistUser], adminController.deleteUser);

// Comercial
router.get("/comercial-admin", adminController.comercial);

router.post("/comercial-upload-file", [verifySession, verifyRolAdmin, uploadComercial.array("file-comercial")], adminController.comercialUpload);

router.post("/comercial-delete-file/:id", [verifySession, verifyRolAdmin], adminController.comercialDelete);

// Recursos Humanos
router.get("/rh-admin", adminController.rh);

router.post("/rh-upload-file", [verifySession, verifyRolAdmin], uploadReh.array("file-rh"), adminController.rhUpload);

router.post("/rh-delete-file/:id", [verifySession, verifyRolAdmin],adminController.rhDelete);

// Crear Admin
//router.post("/g-admin", adminController.admin);

module.exports = router;