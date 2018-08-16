require('dotenv').config();
const conf = {};
const cli = require('oopt')('c:T:t:n:e:E:p:P:f:i:X');
const readar = require('readar');

// i - site id
// c - concurrency
// T - http timeout
// t - scrape maxTime in ms
// n - scrape maxTasks
// e - scrape maxErrors
// E - scrape maxTagErrors
// p - use proxy from cli
// P - add proxy list from file
// _ - add targets from cli
// f - add targets from file
// I - save collection index
// X - clean data/error DB

conf.concurrency = +cli.c || process.env.CONCURRENCY || 1;

conf.id = cli.i || 'test';
conf.index = (cli.I || process.env.SCRAPE_SAVE_INDEX || 'url').split(/[.|,:]/);

conf.mongoString = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

conf.cleanDB = cli.X;

conf.waitForActive = +process.env.WAIT_FOR_ACTIVE || 50;
conf.minDelay = +process.env.SCRAPE_MIN_DELAY || null;

conf.maxTime = +cli.t || +process.env.SCRAPE_MAX_TIME || null;
conf.maxTasks = +cli.n || +process.env.SCRAPE_MAX_TASKS || null;
conf.maxErrors = +cli.e || +process.env.SCRAPE_MAX_ERRORS || null;
conf.maxTagErrors = +cli.E || +process.env.SCRAPE_MAX_TAG_ERRORS || null;

conf.waitForExit = +process.env.WAIT_FOR_EXIT || 5000;

conf.httpOptions = {
    timeout: +cli.T || +process.env.HTTP_TIMEOUT || 10000,
    compressed: true,
};

conf.targets = cli._ || [];
if(cli.f) conf.targets.push(...readar(cli.f));

conf.proxyList = [];
if(cli.p) conf.proxyList.push(cli.p);
if(cli.P) conf.proxyList.push(...readar(cli.P));

module.exports = conf;
