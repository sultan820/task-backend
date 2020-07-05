const mongoose = require('mongoose');
const Joi = require('joi');
const { ownerSchema } = require('./owner');
const { petsSchema } = require('./pets');
const ownsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: ownerSchema,
    required: true,
  },
  pet: {
    type: petsSchema,
    required: true,
  },
});

const Owns = mongoose.model('Owns', ownsSchema);

function validateOwn(own) {
  const schema = {
    ownerId: Joi.objectId().required(),
    petId: Joi.objectId().required(),
  };
  return Joi.validate(own, schema);
}

exports.validate = validateOwn;
exports.Owns = Owns;
