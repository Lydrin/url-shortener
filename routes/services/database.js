const config = require('../../config');

const { database } = config;

if(database === "mondoDB") {
    const mongoService = require("./mongo");
    async function find({urlcode}) {
        return mongoService.find({});
    }
}

