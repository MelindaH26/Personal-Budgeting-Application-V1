// This file simulates a database and contains helper functions for finding certain data

const envelopesRouter = require("../routers/envelopes");

// A database will be connected to the App at a later date
const data = {
income: [
    {name: "melinda\s income",
    ammount: 1000,
    requency: "weekly"}
],
envelopes: [
    {id: 1,
    name: "Travel Budget",
    category: "Travel",
    allowence: 200,
    spent: 0},
    {id: 2,
    name: "Weekly Food Shop",
    category: "Groceries",
    allowence: 100,
    spent: 0},
    {id: 3,
    name: "Physio",
    category: "Health",
    allowence: 50,
    spent: 0},
    {id: 4,
    name: "Dining Out",
    category: "Dining Out",
    allowence: 30,
    spent: 0},
    {id: 5,
    name: "Electricity Bill",
    category: "Utilities",
    allowence: 80,
    spent: 0},
    {id: 6,
    name: "Cosmo\'s Food",
    category: "Pets",
    allowence: 80,
    spent: 0}
],
spendings: [
    {title: "Belmodo\s",
    category: "Groceries",
    ammount: 65}
]
};

// DATA HELPER FUNCTIONS
// get all items of certain data type
const getAllDBItems = dataType => {
    const dataToGet = data[dataType];
    try {
        if (dataToGet) {
            return dataToGet;
        } else {
            throw new Error(`The data for ${dataType} was not found in the Database.`);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Get item by ID
const findItemById = (dataType, id) => {
    const dataCheck = getAllDBItems(dataType);
    // if type of data exists in database
    if (dataCheck !== null) {
        const itemId = Number(id);
        let item = null;

        // check if ID from the request matches an item in the DB
        for (singleItem in dataCheck) {
            if (dataCheck[singleItem].id === itemId) {
                item = dataCheck[singleItem];
            }
        }

        try {
            if (item) {
                return item;
            } else {
                throw new Error(`The data for id of ${itemId} was not found in the Database.`);
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }

    } else {return null};
}

// Add new item to databse
const addItemToDatabase = (datatype, params) => {
    const dataObject = datatype === 'envelopes' ? Object.assign({id: data[datatype].length + 1}, params) : params;
    try {
        if(dataObject) {
            data[datatype].push(dataObject);
            console.log(data[datatype]);
            return dataObject;
        } else {
            throw new Error('something went wrong!');
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {getAllDBItems, findItemById, addItemToDatabase};