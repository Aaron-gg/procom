const multer = require("multer");
const path = require("path");
const mimeTypes = require("mime-types")
const { v4: uuidv4 } = require("uuid");

const storageDG = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/direccion-general'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});

const uploadDG = multer({
    storage: storageDG,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }

});

const storageAdminidstracion = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/administracion'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});

const uploadAdminidstracion = multer({
    storage: storageAdminidstracion,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }
});

const storageRh = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/recursos-humanos'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});

const uploadReh = multer({
    storage: storageRh,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }
});

const storageComercial1 = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/comercial1'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});
const uploadComercial1 = multer({
    storage: storageComercial1,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }
});

const storageComercial2 = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/comercial2'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});

const uploadComercial2 = multer({
    storage: storageComercial2,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }
});

const storageComercial3 = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/comercial3'),
    filename: (req, file, cb) => {
        //cb(null, `${uuidv4()}.${file.originalname}.${mimeTypes.extension(file.mimetype)}`);
        cb(null, `${uuidv4()}.${file.originalname}`);
    }
});

const uploadComercial3 = multer({
    storage: storageComercial3,
    limits: { fileSize: 50000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|mp4|video\/mp4|pptx|docx|document|xlsx|sheet|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo no valido")
    }
});

module.exports = {
    uploadDG,
    uploadAdminidstracion,
    uploadReh,
    uploadComercial1,
    uploadComercial2,
    uploadComercial3
};