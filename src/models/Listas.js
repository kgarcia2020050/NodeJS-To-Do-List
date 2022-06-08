const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Listas=Schema({
    nombre:String,
    descripcion:String,
})

module.exports=mongoose.model("Listas",Listas)