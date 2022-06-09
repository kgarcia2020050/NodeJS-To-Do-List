const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Listas=Schema({
    nombre:String,
    descripcion:String,
    idUsuario:{type:Schema.Types.ObjectId,ref:"Usuarios"}
})

module.exports=mongoose.model("Listas",Listas)