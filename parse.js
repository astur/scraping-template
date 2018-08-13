module.exports = res => {
    const records = [];
    const urls = [];

    records.push({
        url: res.url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
    });

    return {records, urls};
};
