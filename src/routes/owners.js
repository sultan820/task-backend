const validateObjectId = require('../middleware/validateObjectId');
const { Owner, validate } = require('../models/owner');

const express = require('express');
const { Owns } = require('../models/owns');
const router = express.Router();

router.get('/', async (req, res) => {
  const owners = await Owner.find().sort('name');
  res.send(owners);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let owner = new Owner({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
  });
  owner = await owner.save();

  res.send(owner);
});

router.put('/:id', validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const owner = await Owner.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    },
    {
      new: true,
    }
  );

  if (!owner)
    return res.status(404).send('The Owner with the given ID was not found.');

  res.send(owner);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const owner = await Owner.findByIdAndRemove(req.params.id);

  if (!owner)
    return res.status(404).send('The Owner with the given ID was not found.');

  res.send(owner);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const owner = await Owner.findById(req.params.id);

  if (!owner)
    return res.status(404).send('The Owner with the given ID was not found.');

  res.send(owner);
});
router.get('/myPets/:id', validateObjectId, async (req, res) => {
  const owner = await Owner.findById(req.params.id);

  if (!owner)
    return res.status(404).send('The Owner with the given ID was not found.');

  Owns.find({ 'owner._id': { $eq: owner._id } })
    .select('-owner')
    .then((ownedPets) => {
      res.send(ownedPets);
    })
    .catch((e) => res.status(404).send(e));
});
module.exports = router;
