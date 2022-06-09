const Usuarios = require("../models/Usuarios");
const encriptar = require("bcrypt-nodejs");
const jwt = require("../token/jwt");

function registro(req, res) {
  var datos = req.body;
  if (datos.nombre == "" || datos.email == "" || datos.password == "") {
    return res
      .status(500)
      .send({ Error: "Debes llenar todos los campos para poder registrarte." });
  } else {
    var modeloUsuario = new Usuarios();
    modeloUsuario.nombre = datos.nombre;
    modeloUsuario.email = datos.email;

    Usuarios.findOne({ email: datos.email }, (error, usuarioEncontrado) => {
      if (usuarioEncontrado == null) {
        encriptar.hash(datos.password, null, null, (error, claveEncriptada) => {
          modeloUsuario.password = claveEncriptada;
          modeloUsuario.save((error, usuarioAgregado) => {
            if (error)
              return res
                .status(404)
                .send({ Error: "Error al guardar al usuario." });
            if (!usuarioAgregado)
              return res
                .status(500)
                .send({ Error: "No se pudieron guardar tus datos." });
            return res
              .status(200)
              .send({ Exito: "Te has registrado exitosamente." });
          });
        });
      } else {
        return res.status(500).send({
          Error: "Ya existe un usuario registrado con este correo electronico.",
        });
      }
    });
  }
}

function Login(req, res) {
  var datos = req.body;
  if (datos.email == null || datos.password == null) {
    return res.status(500).send({ Error: "Debes llenar todos los datos." });
  } else {
    Usuarios.findOne({ email: datos.email }, (error, usuarioEncontrado) => {
      if (error)
        return res.status(500).send({ Error: "Error en la peticion." });
      if (usuarioEncontrado) {
        encriptar.compare(
          datos.password,
          usuarioEncontrado.password,
          (error, verificado) => {
            if (verificado) {
              return res
                .status(200)
                .send({ Inicio_exitoso: usuarioEncontrado });
            } else {
              return res.status(500).send({ Error: "La clave no coincide." });
            }
          }
        );
      } else {
        return res
          .status(500)
          .send({ Error: "Los datos que ingresaste no existen." });
      }
    });
  }
}

module.exports = {
  registro,
  Login,
};
