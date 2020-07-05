const express = require('express');
const config = require("config");
const app = express();

require('./src/startup/config')();
require('./src/startup/db')();
require('./src/startup/routes')(app);
require('./src/startup/validation')();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
