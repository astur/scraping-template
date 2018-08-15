const {id, targets} = require('./conf');
const db = require('./db');
module.exports = require('mq-mongo')(db, {
    name: `mq_${id}`,
    clean: !!targets.length,
    strict: true,
    tries: 1,
});
