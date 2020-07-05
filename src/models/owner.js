const mongoose = require('mongoose');
const Joi = require('joi');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  address: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 16,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});

const Owner = mongoose.model('Owner', ownerSchema);

function validateOwner(owner) {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    address: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(16).required(),
    email: Joi.string().min(5).max(255).required().email(),
  };
  return Joi.validate(owner, schema);
}

exports.validate = validateOwner;
exports.Owner = Owner;
exports.ownerSchema = ownerSchema;
