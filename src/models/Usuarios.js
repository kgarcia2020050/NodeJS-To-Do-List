const mongoose = require('mongoose')
const Schema=mongoose.Schema

const Usuarios=Schema({
    nombre:String,
    email:String,
    password:String,
})

module.exports=mongoose.model("Usuarios",Usuarios)