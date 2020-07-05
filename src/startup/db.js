const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to with database in MLab...`);
    })
    .catch((err) => {
      console.log('Could not connect with mongodb ', err);
    });
};
