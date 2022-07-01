const multer = require("multer");
const path = require("path");
const mimeTypes = require("mime-types")
const { v4: uuidv4 } = require("uuid");

const storageComercial = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/comercial'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});
const uploadComercial = multer({
    storage: storageComercial
});

const storageRh = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/recursos-humanos'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});
const uploadReh = multer({
    storage: storageRh
});

module.exports = {
    uploadComercial,
    uploadReh
};