module.exports = res => {
    const records = [];
    const urls = [];

    const r = {
        url: res.url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        requestDt: new Date(res.timings.start),
    };

    if(typeof res.body === 'string'){
        r.title = (res.body.match(/<title[^>]*>([^>]+)</i) || [])[1] || null;
    } else {
        r.data = JSON.stringify(res.body);
    }

    records.push(r);

    return {records, urls};
};
