const mongoose = require('mongoose');
const Joi = require('joi');

const petsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  colour: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
});

const Pet = mongoose.model('Pets', petsSchema);

function validatePet(pet) {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    colour: Joi.string().min(3).max(10).required(),
    age: Joi.number().integer().min(1).max(100).required(),
    breed: Joi.string().min(3).max(20).required(),
  };
  return Joi.validate(pet, schema);
}

exports.validate = validatePet;
exports.Pet = Pet;
exports.petsSchema = petsSchema;
