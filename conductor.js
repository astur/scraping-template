const {maxTime, maxTasks, maxErrors, maxTagErrors} = require('./conf');
const abbado = require('abbado')({
    timeout: maxTime,
    count: maxTasks,
    errorLimit: maxErrors,
    tagErrorLimit: maxTagErrors,
});

module.exports = abbado;
