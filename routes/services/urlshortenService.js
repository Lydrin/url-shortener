const btoa = require('btoa');
const mongoService = require('./mongoService');

function read({ hash }) {
  return mongoService.read({ hash });
}

function write({ url }) {
  const hash = btoa(url);
  return mongoService.write({ url, hash });
}

module.exports = {
  read,
  write,
};
