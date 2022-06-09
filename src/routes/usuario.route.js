const express = require('express');
const controller=require("../controllers/UsuarioController")
var api=express.Router()

api.post("/registro",controller.registro)
api.post("/login",controller.Login)

module.exports=api;