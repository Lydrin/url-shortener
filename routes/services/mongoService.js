const mongojs = require('mongojs');
const logger = require('log4js').getLogger();
const config = require('../../config');

logger.level = 'debug';

const { host, dbName, collectionName } = config.mongoDB;
const db = mongojs(`${host}/${dbName}`, [collectionName]);
const collection = db.collection(`${collectionName}`);

db.on('error', (err) => {
  logger.error(`database error : ${err}`);
});

db.on('connect', () => {
  logger.info('database connected');
});

function read({ hash }) {
  return new Promise((resolve, reject) => {
    collection.findOne({ hash }, (err, doc) => {
      if (err) {
        return reject(new Error("Une erreur s'est produite lors de l'accès en base"));
      }
      return resolve(doc);
    });
  });
}

async function write({ hash, url }) {
  return new Promise((resolve, reject) => {
    collection.insert({ url, hash }, (err, doc) => {
      if (err) {
        return reject(new Error("Une erreur s'est produite lors de l'accès en base"));
      }
      return resolve(doc);
    });
  });
}

module.exports = {
  read,
  write,
};
