const validateObjectId = require('../middleware/validateObjectId');
const { Owns, validate } = require('../models/owns');
const { Owner } = require('../models/owner');
const { Pet } = require('../models/pets');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const owns = await Owns.find().sort('-date');
  res.send(owns);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const owner = await Owner.findById(req.body.ownerId);
  if (!owner) return res.status(400).send('Invalid Owner.');

  const pet = await Pet.findById(req.body.petId);
  if (!pet) return res.status(400).send('Invalid Pet.');

  let own = new Owns({
    owner: {
      _id: owner._id,
      name: owner.name,
      address: owner.address,
      phone: owner.phone,
      email: owner.email,
    },
    pet: {
      _id: pet._id,
      name: pet.name,
      colour: pet.colour,
      age: pet.age,
      breed: pet.breed,
    },
  });

  own = await own.save();
  res.send(own);
});
router.get('/:id', validateObjectId, async (req, res) => {
  const own = await Owns.findById(req.params.id);

  if (!owned)
    return res.status(404).send('The Record with the given ID was not found.');

  res.send(owned);
});

router.put('/:id', validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const owner = await Owner.findById(req.body.ownerId);
  if (!owner) return res.status(400).send('Invalid Owner.');

  const pet = await Pet.findById(req.body.petId);
  if (!pet) return res.status(400).send('Invalid Pet.');

  let own = await Owns.findByIdAndUpdate(
    req.params.id,
    {
      owner: {
        _id: owner._id,
        name: owner.name,
        address: owner.address,
      },
      pet: {
        _id: pet._id,
        title: pet.name,
      },
    },
    { new: true }
  );
  if (!own) return res.status(400).send('No Record found with given id');
  res.send(own);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const own = await Own.findByIdAndRemove(req.params.id);
  if (!own) return res.status(400).send('No Record found with given id');
  res.send(own);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const own = await Owned.findById(req.params.id);
  if (!own) return res.status(400).send('No Record found with given id');
  res.send(owned);
});

module.exports = router;
