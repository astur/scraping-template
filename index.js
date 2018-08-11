const {concurrency, httpOptions} = require('./conf');
const lavine = require('lavine');
const scrape = require('./scrape');
const {onStart, onFinish, onSuccess, onError} = require('./handle');

(async () => {
    const getWorker = () => () => scrape(httpOptions).then(onSuccess, onError);
    await onStart();
    await lavine(getWorker, concurrency);
    await onFinish();
})();
