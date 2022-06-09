const express = require('express')
const controller=require("../controllers/ListaController")
const autenticacion=require("../middleware/autenticacion")
var api=express.Router()

api.get("/verTareas/:ID",controller.verTareas)
api.get("/tareaPorId/:ID",controller.tareaPorId)    
api.post("/nuevaTarea/:ID",controller.nuevaTarea)
api.put("/editarTarea/:ID",controller.editarTarea)
api.delete("/eliminarTarea/:ID",controller.eliminarTarea)
module.exports=api