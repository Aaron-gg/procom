'use strict';

const router = require("express").Router();

const validateData = require("../middlewares/validateData");
const userShemaValid = require("../middlewares/schemasValidation/createUserShema.validation");
//const userEdShemaValid = require("../middlewares/schemasValidation/editUserShema.validation");

const { verifyExistUser, verifyEditUser } = require("../middlewares/admin.validation");
const { verifySession, verifyRolAdmin, verifyCreateUser } = require("../middlewares/auth.validation");

const { 
    uploadDG,
    uploadAdminidstracion,
    uploadReh,
    uploadComercial1,
    uploadComercial2,
    uploadComercial3 
} = require("../middlewares/multer");

const authController = require("../controllers/auth.controllers");
const adminController = require("../controllers/admin.controllers");

router.get("/dashboard", adminController.home);

// Users
router.post("/create-user", [verifySession, verifyRolAdmin, validateData(userShemaValid), verifyCreateUser], authController.singUp);

router.get("/edit-user/:id", verifyExistUser, adminController.pageEditUser);

router.put("/edit-user/:id", [verifySession, verifyRolAdmin, verifyExistUser, verifyEditUser], adminController.editUser);

router.delete("/delete-user/:id", [verifySession, verifyRolAdmin, verifyExistUser], adminController.deleteUser);

// Direccion General
router.get("/dg-admin", adminController.direccionGeneral);

router.post("/dg-upload-file", [verifySession, verifyRolAdmin], uploadDG.array("file-dg"), adminController.direccionGeneralUpload);

router.post("/dg-delete-file/:id", [verifySession, verifyRolAdmin],adminController.direccionGeneralDelete);

// Administracion
router.get("/administracion-admin", adminController.administracion);

router.post("/administracion-upload-file", [verifySession, verifyRolAdmin], uploadAdminidstracion.array("file-administracion"), adminController.administracionUpload);

router.post("/administracion-delete-file/:id", [verifySession, verifyRolAdmin],adminController.administracionDelete);

// Recursos Humanos
router.get("/rh-admin", adminController.rh);

router.post("/rh-upload-file", [verifySession, verifyRolAdmin], uploadReh.array("file-rh"), adminController.rhUpload);

router.post("/rh-delete-file/:id", [verifySession, verifyRolAdmin],adminController.rhDelete);

// Comercial1
router.get("/comercial1-admin", adminController.comercial1);

router.post("/comercial1-upload-file", [verifySession, verifyRolAdmin, uploadComercial1.array("file-comercial1")], adminController.comercial1Upload);

router.post("/comercial1-delete-file/:id", [verifySession, verifyRolAdmin], adminController.comercial1Delete);

// Comercial2
router.get("/comercial2-admin", adminController.comercial2);

router.post("/comercial2-upload-file", [verifySession, verifyRolAdmin, uploadComercial2.array("file-comercial2")], adminController.comercial2Upload);

router.post("/comercial2-delete-file/:id", [verifySession, verifyRolAdmin], adminController.comercial2Delete);

// Comercial3
router.get("/comercial3-admin", adminController.comercial3);

router.post("/comercial3-upload-file", [verifySession, verifyRolAdmin, uploadComercial3.array("file-comercial3")], adminController.comercial3Upload);

router.post("/comercial3-delete-file/:id", [verifySession, verifyRolAdmin], adminController.comercial3Delete);

// Crear Admin
//router.post("/g-admin", adminController.admin);

module.exports = router;