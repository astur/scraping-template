const conf = {};

conf.concurrency = 20;

conf.id = 'test';
conf.targets = process.argv.slice(2);

conf.mongoString = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

conf.waitForActive = 500;

conf.httpOptions = {
    timeout: 10000,
    compressed: true,
};

conf.save = {
    valid: `data_${conf.id}`,
    errors: `errors_${conf.id}`,
    index: 'url',
};
conf.queue = {
    name: `mq_${conf.id}`,
    clean: !!conf.targets.length,
    strict: true,
    tries: 1,
};

module.exports = conf;
