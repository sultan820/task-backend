const express = require('express');
var cors = require('cors')
const owners = require('../routes/owners');
const pets = require('../routes/pets');
const owns = require('../routes/owns');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use(cors())
  app.use('/api/owners', owners);
  app.use('/api/pets', pets);
  app.use('/api/owns', owns);
  app.use(error);
};
