const express = require('express');
const cors = require('cors');
var app = express();

const rutaListas = require('./src/routes/listas.route');
const rutasUsuarios= require('./src/routes/usuario.route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api',rutaListas,rutasUsuarios);


module.exports = app;