const config = require('../../config');

const { url, dbName, collectionName } = config.mongoDB;
const db = mongojs(`${url}/${dbName}`, [collectionName]);

db.on('error', function (err) {
	console.log('database error', err)
});

db.on('connect', function () {
	console.log('database connected')
});

module.exports = db;