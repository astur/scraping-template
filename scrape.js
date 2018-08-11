const q = require('./queue');
const scra = require('scra');
const parse = require('./parse');
const save = require('./save');

module.exports = async () => {
    const {data: url, tag} = await q.get();
    const response = await scra({url});
    const parsed = await parse(response);
    await q.ping(tag);
    await save(parsed.records);
    await q.add(parsed.urls);
    await q.ack(tag);
};
