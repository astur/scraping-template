const {concurrency, httpOptions, minDelay} = require('./conf');
const lavine = require('lavine');
const unquick = require('unquick');
const scrape = require('./scrape');
const {onStart, onFinish, onSuccess, onError} = require('./handle');

(async () => {
    const worker = unquick(
        options => scrape(options).then(onSuccess, onError),
        minDelay || 0
    );
    const getWorker = () => () => worker(httpOptions);
    await onStart();
    await lavine(getWorker, concurrency);
    await onFinish();
})();
