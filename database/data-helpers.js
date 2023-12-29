const {
    income,
    envelopes,
    spendings
} = require('./data.js');

const findItemById = (dataType, id) => {
    const item = dataType[id];
    console.log(item);
    if (item !== null) {
        console.log(`this is the item with Id of ${id} and value of:${item}`);
        return item;
    } else {
        console.log('there was an error');
    }
}

module.exports = findItemById;