module.exports = records => records.map(r => {
    const errors = [];
    // if(somethingWrong(f)) errors.push('something wrong');
    if(errors.length > 0) r.errors = errors; // and record will be saved to errors collection
    return r;
});
