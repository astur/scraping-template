const {waitForActive, targets} = require('./conf');
const db = require('./db');
const log = require('cllc')(null, '%F %T');
const delay = require('delay');
const {saveLog} = require('./save');
const q = require('./queue');
const {collect, summary} = require('./sc');
const _ = require('./conductor');

const onSuccess = async result => {
    await _.wait(); // flow synchronization
    collect('requestCountSuccess', 1);
    collect(result); // collect scrape results
    log.inc(1); // increment counters
    return true;
};

const onError = async e => {
    // tl;dr:
    // return `!_.stopped()`) if you want to continue (if not stopped)
    // return false if you want to stop this thread
    // throw error (or anything else) if you want to change worker (if you have another)
    // call _.stop if you want softly stop all threads
    // call _.pause if you want delay all threads
    // call delay if you want delay only one thread
    // call _.error(<tag>) if you want check count of errors (all and for this tag)

    await _.wait(); // flow synchronization

    if(e.name === 'QueueGetError'){
        if(e.stats.active){
            await delay(waitForActive);
            return !_.stopped();
        }
        return;
    }

    // if redirect or other "non-error":
    // q.add location header (or do anything necessary)
    // log message
    // increment counters
    // return true

    collect('requestCountError', 1); // collect error
    log.inc(2); // increment counters

    // if known error:
    // [optional] q.add url (if you want to try again)
    // flow synchronization, log, counter etc.
    // return/throw (see above)

    // if unknown error:
    log.e(e); // log message
    _.stop({
        status: 'error',
        error: e.name,
        message: e.message,
    }); // stop all threads
    // return false
};

const onStart = async () => {
    log.i(`Scraping ${targets ? 'started' : 'resumed'}`); // log message
    log.start('[ %s - pages scraped | %s - errors ]'); // start counters
    if(targets) await q.add(targets);
};

const onFinish = async () => {
    try {
        const sum = summary(_.stopped());
        log.finish(); // stop counters
        log.i(`Scraping ${sum.status === 'ok' ? 'finished' : 'stopped'}\n`, sum); // log message and collected summary
        await saveLog(sum);
    } catch(e){
        log.e(e);
    }
    (await db).close();
    _.cleanup();
    // other cleanups
};

module.exports = {onSuccess, onError, onStart, onFinish};
