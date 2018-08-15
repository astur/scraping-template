const {id, index} = require('./conf');
const db = require('./db');
const monscr = require('monscr');

module.exports = monscr(db, {
    valid: `data_${id}`,
    errors: `errors_${id}`,
    index,
});

module.exports.saveLog = monscr(db, {
    valid: `log_${id}`,
    errors: `log_${id}`,
    index: 'startDt',
});
