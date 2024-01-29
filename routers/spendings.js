// TODO update the spendings PUT route to include a call to updateEnvelopeSpendings() to calculate the amount on the corresponding envelope
const express = require('express');
const spendingsRouter = express.Router();
// Impoty required database helpers
const {getItemsFromDatabase, findItemById, addItemToDatabase, updateEnvelopeSpendings, updateItemInDatabase, deleteItemFromDatabase} = require('../database/data');

// Get all spendings
spendingsRouter.get('/', (req, res) => {
    const spendings = getItemsFromDatabase('spendings');
    if (spendings !== null) {
        res.send(spendings);
    } else {
        res.status(404).send(`Requested data not found`);
    }
});

// Check if spending with the id exists
spendingsRouter.param('spendingID', (req, res, next, spendingID) => {
    const item = findItemById('spendings', spendingID);
    if (item === null) {
        res.status(404).send(`Requested item not found`);
    }
    else {
        req.item = item;
        next();
    }
});

// Get a single spending by ID
spendingsRouter.get('/:spendingID', (req, res) => {
    res.send(req.item);
});

// Post a new spending
spendingsRouter.post('/', (req, res) => {
    const { title, category, amount, date } = req.body;

    if (!(title && category && (amount > 0) && date)) {
        res.status(400).send('The required fields were not entered correctly');
    }
    // call function to add to db
    const addItem = addItemToDatabase('spendings', req.body);
    if (addItem === null) {
        res.status(400).send('Request failed');
    }
    else{
        res.status(200).send(`Expense ${req.body.title} was added`);
    }

    // Update envelope spent amount
    updateEnvelopeSpendings(category, amount);

});

// Update a spending by ID
spendingsRouter.put('/:spendingID', (req, res) => {
    const updateditem = updateItemInDatabase(req.body, req.item);
    if (updateditem === null) {
        res.status(400).send(`Values that shouldn\'t exist were sent in the request`);
    } else {
        res.send(updateditem);
    }
});

// Delete a spending
spendingsRouter.delete('/:spendingID', (req, res) => {
    const itemDeleted = deleteItemFromDatabase('spendings', req.item);
    if(!itemDeleted) {
        res.status(400).send();
    } else {
        res.send(`Spending for \'${req.item.title}\' deleted`);
    }
});

module.exports = spendingsRouter;