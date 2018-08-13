module.exports = res => {
    const records = [];
    const urls = [];

    records.push({
        url: res.url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        requestDt: new Date(res.timings.start),
    });

    return {records, urls};
};
