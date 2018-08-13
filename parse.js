module.exports = res => {
    const records = [];
    const urls = [];

    records.push({
        url: res.url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        requestDt: new Date(res.timings.start),
        data: typeof res.body === 'string' ?
            (res.body.match(/<title[^>]*>([^>]+)</i) || [])[1] || null :
            JSON.stringify(res.body),
    });

    return {records, urls};
};
