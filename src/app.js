const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const { createRoles } = require("./libs/initialSetUp");

const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const uploadsRoutes = require('./routes/uploads.routes');

const { notFound, internalServerError } = require('./handlers/handlers.js');

// Initializations
const app = express();
createRoles();
require("./config/database");

// Settings
app.set("port", process.env.PORT || 3333);
app.set("views", path.join(__dirname, "views"));
app.engine('.hbs', exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
//app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', uploadsRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Handlers
app.use(notFound);
app.use(internalServerError);

module.exports = app;