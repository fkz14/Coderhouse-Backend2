const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const saltRounds = 10;
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Método para comparar password
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Quitar password al devolver usuario
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
