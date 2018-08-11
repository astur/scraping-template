const {mongoString} = require('./conf');
const mongo = require('mongodb').MongoClient;
module.exports = mongo.connect(mongoString, {useNewUrlParser: true}).then(client => {
    if('databaseName' in client) return client;
    const db = client.db(mongoString.split('/').pop());
    db.close = client.close.bind(client);
    return db;
}).catch(e => {
    process.exit(1);
});
