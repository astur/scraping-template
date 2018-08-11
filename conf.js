const conf = {};

conf.concurrency = 20;

conf.id = 'test';

conf.save = {
    valid: `data_${conf.id}`,
    errors: `errors_${conf.id}`,
    index: 'url',
};
conf.queue = {
    name: `mq_${conf.id}`,
    strict: true,
    tries: 1,
};

module.exports = conf;
