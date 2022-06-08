const { off } = require("../models/Listas");
const Listas = require("../models/Listas");

function verTareas(req, res) {
  Listas.find((error, listadoTareas) => {
    if (error)
      return res.status(404).send({ Error: "Error al cargar las tareas." });
    if (!listadoTareas)
      return res.status(500).send({ Error: "No existe ninguna tarea." });
    return res.status(200).send({ Listado_tareas: listadoTareas });
  });
}

function nuevaTarea(req, res) {
  var datos = req.body;
  if (datos.nombre || datos.descripcion) {
    var modeloListas = new Listas();
    modeloListas.nombre = datos.nombre;
    modeloListas.descripcion = datos.descripcion;
    modeloListas.save((error, newTask) => {
      if (error) return res.status(404).send({ Error: "Ocurrio un error." });
      if (!newTask)
        return res.status(500).send({ Error: "No se pudo crear la tarea." });
      return res.status(200).send({ Mis_tareas: newTask });
    });
  } else {
    return res
      .status(500)
      .send({ Error: "Debes llenar todos los campos para agregar la tarea." });
  }
}

function tareaPorId(req, res) {
  Listas.findById({ _id: req.params.ID }, (error, tareaHallada) => {
    if (error)
      return res.status(404).send({ Error: "Error al obtener la tarea." });
    if (!tareaHallada)
      return res.status(500).send({ Error: "No existe esta tarea." });
    return res.status(200).send({ Tarea_hallada: tareaHallada });
  });
}

function editarTarea(req, res) {
  var datos = req.body;
  if (datos.nombre == "" || datos.descripcion == "") {
    return res.status(404).send({ Error: "Te faltan uno o mas campos para modificar." });
  } else {
    Listas.findByIdAndUpdate(
      { _id: req.params.ID },
      datos,
      { new: true },
      (error, tareaActualizada) => {
        if (error)
          return res.status(404).send({ Error: "Error al obtener la tarea." });
        if (!tareaActualizada)
          return res
            .status(500)
            .send({ Error: "Ocurrio un error actualizar la tarea." });
            return res.status(200).send({Tarea_editada: tareaActualizada})
      }
    );
  }
}

function eliminarTarea(req,res){
  Listas.findByIdAndDelete({_id:req.params.ID},(error,tareaBorrada) => {
    if(error) return res.status(404).send({Error:"Error al eliminar la tarea."})
    if(!tareaBorrada)return res.status(500).send({Error:"No se pudo eliminar la tarea."})
    return res.status(200).send({Tarea_borrada: tareaBorrada})
  })
}

module.exports = {
  verTareas,
  nuevaTarea,
  tareaPorId,
  editarTarea,
  eliminarTarea
};
