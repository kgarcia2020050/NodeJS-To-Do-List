const express = require('express')
const controller=require("../controllers/ListaController")

var api=express.Router()

api.get("/verTareas",controller.verTareas)
api.get("/tareaPorId/:ID",controller.tareaPorId)    
api.post("/nuevaTarea",controller.nuevaTarea)
api.put("/editarTarea/:ID",controller.editarTarea)
api.delete("/eliminarTarea/:ID",controller.eliminarTarea)
module.exports=api