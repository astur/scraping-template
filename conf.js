require('dotenv').config();
const conf = {};

conf.concurrency = 1;

conf.id = 'test';
conf.index = 'url';

conf.targets = process.argv.slice(2);

conf.mongoString = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

conf.waitForActive = 50;
conf.minDelay = null;

conf.maxTime = null;
conf.maxTasks = null;
conf.maxErrors = null;
conf.maxTagErrors = null;

conf.waitForExit = 5000;

conf.httpOptions = {
    timeout: 10000,
    compressed: true,
};

conf.proxyList = null;

module.exports = conf;
