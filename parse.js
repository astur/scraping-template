module.exports = res => {
    const records = [];
    const urls = [];

    try {
        const r = {
            url: res.url,
            status: res.statusCode,
            contentType: res.headers['content-type'],
            requestDt: new Date(res.timings.start),
        };
        if(typeof res.body === 'string'){
            r.title = (res.body.match(/<title[^>]*>([^>]+)</i) || [])[1] || null;
            r.length = res.body.length;
            r.charset = res.charset;
        } else {
            r.data = JSON.stringify(res.body);
        }
        records.push(r);
    } catch(e){
        const err = new Error('Can\'t parse response');
        err.name = 'ParseError';
        err.cause = e;
        err.url = res.url;
        err.status = res.statusCode;
        err.headers = res.headers;
        err.bodyLength = res.body.length;
        throw err;
    }

    return {records, urls};
};
