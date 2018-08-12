const q = require('./queue');
const scra = require('scra');
const parse = require('./parse');
const save = require('./save');

module.exports = async () => {
    const {data: url, tag} = await q.get();

    try {
        const response = await scra({url});
        const parsed = await parse(response);
        await q.ping(tag);
        const saved = await save(parsed.records);
        await q.add(parsed.urls);
        await q.ack(tag);
        return {
            requestTime: response.requestTime,
            bytesSent: response.bytes.sent,
            bytesReceived: response.bytes.received,
            ...saved,
        };
    } catch(e){
        await q.ack(tag);
        throw e;
    }
};
