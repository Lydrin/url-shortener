const databaseService = require('./mongo');

async function find ({urlCode}) {
    return databaseService.find({urlCode: urlCode});
}

async function write ({originalUrl}) {
    const urlCode = btoa()
    return databaseService.write({originalUrl: originalUrl, urlCode: urlCode});
}

module.exports = find;