const path = require('path');
const {secret, port, dburl} = require('../secret/config.js');

module.exports = {
  rootPath: path.join(__dirname, '../'),
  port,
  secret,
  dburl,
};
