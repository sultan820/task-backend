const validateObjectId = require('../middleware/validateObjectId');
const { Pet, validate } = require('../models/pets');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const pets = await Pet.find().sort('name');
  res.send(pets);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let pet = new Pet({
    name: req.body.name,
    colour: req.body.colour,
    age: req.body.age,
    breed: req.body.breed,
  });
  pet = await pet.save();

  res.send(pet);
});

router.put('/:id', validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const pet = await Pet.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      colour: req.body.colour,
      age: req.body.age,
      breed: req.body.breed,
    },
    {
      new: true,
    }
  );

  if (!pet)
    return res.status(404).send('The Pet with the given ID was not found.');

  res.send(pet);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const pet = await Pet.findByIdAndRemove(req.params.id);

  if (!pet)
    return res.status(404).send('The Pet with the given ID was not found.');

  res.send(pet);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet)
    return res.status(404).send('The Pet with the given ID was not found.');

  res.send(pet);
});

module.exports = router;
