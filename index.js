const {concurrency} = require('./conf');
const lavine = require('lavine');
const scrape = require('./scrape');

(async () => {
    await lavine(() => scrape, concurrency);
})();
