const {collect, summary} = require('summary-collector')({
    counters: [
        'bytesSent',
        'bytesReceived',
        'inserted',
        'modified',
        'duplicated',
        'errors',
        'requestCountSuccess',
        'requestCountError',
    ],
    quantile: 0.95,
});

module.exports = {collect, summary};
