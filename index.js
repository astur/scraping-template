const {concurrency, httpOptions} = require('./conf');
const lavine = require('lavine');
const scrape = require('./scrape');

(async () => {
    const getWorker = () => () => scrape(httpOptions);
    await lavine(getWorker, concurrency);
})();
