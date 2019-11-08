const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const rolesValidos = {

    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un roll valido'
}

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
     type: String,
     unique: true,
     required: [true, 'El email es necesario']
  },

  password: {
     type: String,
     required: [true, 'El password es obligatorio']
  },
  img: {
        type: String,
        required: false 
  },
  role: {
      type: String,
      default: 'USER_ROLE',
      enum: rolesValidos

  },
  estado: {
      type: Boolean,
      default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function () {

  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;

}

usuarioSchema.plugin( uniqueValidator, {

  message: '{PATH} debe de ser único'

} );

module.exports = mongoose.model('Usuario', usuarioSchema);