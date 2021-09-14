//Import package express
const express = require("express");
//Import package body-parser
const bodyParser = require('body-parser');
//Import package path
const path = require("path");
//Import package helmet
const helmet = require('helmet');
//Import package sanitize-middleware
const sanitizeMiddleware = require("sanitize-middleware");

//ROUTES
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

//Initialisation application
const app = express();

//Autorisation inter serveur
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//Initialisation des packages
app.use(helmet())
app.use(sanitizeMiddleware());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

//Gestion url API
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;