const express = require('express');
const spendingsRouter = express.Router();
// Impoty required database helpers
const {getItemsFromDatabase, addItemToDatabase} = require('../database/data');

// Get all spendings
spendingsRouter.get('/', (req, res) => {
    const spendings = getItemsFromDatabase('spendings');
    if (spendings !== null) {
        res.send(spendings);
    } else {
        res.status(404).send(`Requested data not found`);
    }
});

// Post a new spending
spendingsRouter.post('/', (req, res) => {
    const { title, category, amount, date } = req.body;

    // check for fields
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
});

module.exports = spendingsRouter;