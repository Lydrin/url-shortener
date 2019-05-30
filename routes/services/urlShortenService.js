const btoa = require('btoa');
const log = require('log4js').getLogger();
const mongoService = require('./mongoService');

log.level = 'debug';

async function read({ hash }) {
  try {
    return await mongoService.read({ hash });
  } catch (err) {
    log.error(err);
    throw err;
  }
}

async function write({ url }) {
  const hash = btoa(url);
  try {
    return await mongoService.write({ url, hash });
  } catch (err) {
    log.error(err);
    throw err;
  }
}

module.exports = {
  read,
  write,
};
