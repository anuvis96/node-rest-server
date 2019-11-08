const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");
const app = express();

app.get("/usuario", function(req, res) {

  let estado = {
    estado: true
  }

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find(estado, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count(estado, (err, conteo_r) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo_r,
        });
      });
    });
});

app.post("/usuario", function(req, res) {
  const body = req.body;

  const usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put("/usuario/:id", function(req, res) {
  const id = req.params.id;
  const body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let cambioEstado = {

      estado: false
  };

  //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado",
        },
      });
    }
    
     res.json({
          ok: true,
          usuario: usuarioBorrado
        });   
  });
});

module.exports = app;
