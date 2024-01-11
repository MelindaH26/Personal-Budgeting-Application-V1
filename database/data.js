// This file simulates a database and contains helper functions for GET, POST, PUT and DELETE requests

/*TODO
- Create data structes for each data type that functions can use to loop through each needed key/value pair and assign/reassign them. 
This is to help reduce the amount of logic needed in functions that add or update objects in the database 
- remove name from envelopes data
- updateItemInDatabase needs to acount for non numeric values entered where numeric ones should be 

TESTING
- check that the functions work for all data types -> routers for other data types must be setup first
*/

// A database will be connected to the App at a later date
const data = {
income: [
    {name: "melinda\'s income",
    ammount: 1000,
    frequency: "weekly"}
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
    {title: "Belmodo\'s",
    category: "Groceries",
    ammount: 65,
    date: '2024:01:01'}
]
};

const keysThatShouldBeNumbers = ['id', 'allowence', 'spent', 'ammount'];

// DATA HELPER FUNCTIONS
// get all items of certain data type
const getItemsFromDatabase = dataType => {
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
    const dataCheck = getItemsFromDatabase(dataType);
    // if type of data type exists in database
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

// Update item in the database 
const updateItemInDatabase = (newParams, itemToUpdate) => {
    // itemToUpdate is a direct reference of the object that needs to be updated
    // so we dont need to use a datatype here
    const objectLength = Object.keys(newParams).length;
    for (let i = 0; i < objectLength; i++) {
        let key = Object.keys(newParams)[i];
        let value = Object.values(newParams)[i];
        // if key exists in database update it
        if (itemToUpdate[key]) {
            // converts values that should be numbers
            if(keysThatShouldBeNumbers.includes(key) === true) {
                value = Number(value);
            }
            itemToUpdate[key] = value;
        } else {
            return null;
        }
    }
    return itemToUpdate;
}

// Delete item from databse
const deleteItemFromDatabase = (dataType, params) => {
    const daraArray = data[dataType];
    const idOfItemToRemove = params.id;
    splice = daraArray.splice(daraArray.findIndex(item => item.id === idOfItemToRemove), 1);
    return true;
}

module.exports = {getItemsFromDatabase, findItemById, addItemToDatabase, updateItemInDatabase, deleteItemFromDatabase};