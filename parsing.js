module.exports = res => {
    const records = [];
    const urls = [];

    records.push({
        url: res.url,
        status: res.statusCode,
    });

    return {records, urls};
};
