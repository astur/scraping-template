const {waitForActive, targets} = require('./conf');
const db = require('./db');
const delay = require('delay');
const q = require('./queue');

const onSuccess = () =>
    // flow synchronization
    // collect scrape results (when present)
    // increment counters
    true;

const onError = async e => {
    // tl;dr:
    // return true if you want to continue
    // return false if you want to stop this thread
    // throw error (or anything else) if you want to change worker (if you have another)

    // flow synchronization (here and below)

    if(e.name === 'QueueGetError'){
        if(e.stats.active){
            await delay(waitForActive);
            return true;
        }
        return false;
    }

    // if redirect or other "non-error":
    // q.add location header (or do anything necessary)
    // log message
    // increment counters
    // return true

    // collect error
    // increment counters

    // if known error:
    // [optional] q.add url (if you want to try again)
    // flow synchronization, log, counter etc.
    // return/throw (see above)

    // if unknown error:
    // log message
    // stop all threads some way
    // return false
};

const onStart = async () => {
    // log message
    // start counters
    if(targets) await q.add(targets);
};

const onFinish = async () => {
    // log message
    // log collected summary
    (await db).close();
    // other cleanups
};

module.exports = {onSuccess, onError, onStart, onFinish};
