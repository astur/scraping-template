require('dotenv').config();
const conf = {};

conf.concurrency = process.env.CONCURRENCY || 1;

conf.id = 'test';
conf.index = (process.env.SCRAPE_SAVE_INDEX || 'url').split(/[.|,:]/);

conf.targets = process.argv.slice(2);

conf.proxyList = null;

conf.mongoString = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

conf.waitForActive = +process.env.WAIT_FOR_ACTIVE || 50;
conf.minDelay = +process.env.SCRAPE_MIN_DELAY || null;

conf.maxTime = +process.env.SCRAPE_MAX_TIME || null;
conf.maxTasks = +process.env.SCRAPE_MAX_TASKS || null;
conf.maxErrors = +process.env.SCRAPE_MAX_ERRORS || null;
conf.maxTagErrors = +process.env.SCRAPE_MAX_TAG_ERRORS || null;

conf.waitForExit = +process.env.WAIT_FOR_EXIT || 5000;

conf.httpOptions = {
    timeout: +process.env.HTTP_TIMEOUT || 10000,
    compressed: true,
};

module.exports = conf;
