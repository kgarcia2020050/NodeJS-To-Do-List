const Usuarios = require("../models/Usuarios");
const encriptar = require("bcrypt-nodejs");

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

    Usuarios.findOne(
      { email: { $regex: datos.email, $options: "i" } },
      (error, usuarioEncontrado) => {
        if (usuarioEncontrado == null) {
          encriptar.hash(
            datos.password,
            null,
            null,
            (error, claveEncriptada) => {
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
              });
            }
          );
        } else {
          return res
            .status(500)
            .send({
              Error:
                "Ya existe un usuario registrado con este correo electronico.",
            });
        }
      }
    );
  }
}

function login(req, res) {}
