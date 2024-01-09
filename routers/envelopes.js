const express = require('express');
const envelopesRouter = express.Router();

// Import database helpers
const {getItemsFromDatabase, findItemById, addItemToDatabase, updateItemInDatabase} = require('../database/data');

// Get all envelopes
envelopesRouter.get('/', (req, res) => {
    const envelopes = getItemsFromDatabase('envelopes');
    if (envelopes !== null) {
        res.send(envelopes);
    } else {
        res.status(404).send(`Requested data not found`);
    }
});

// Create a new envelope
envelopesRouter.post('/', (req, res) => {
    const request = req.query;
    const category = request.category;
    const name = request.name ? request.name : category;
    const allowence = request.allowence;
    const spent = request.spent ? request.spent : 0;
    
    if (category && name && allowence && (spent || spent === 0)) {
        const object = {
            name: name,
            category: category,
            allowence: Number(allowence),
            spent: Number(spent)
        };
        const addedItem = addItemToDatabase('envelopes', object);
        if(addedItem === null) {
            res.status(400).send('Request failed');
        } else {
            res.send(object);
        }
    } else {
        res.status(400).send('Required fields were not entered correctly');
    }
});

// Check if envelope with the id exists
envelopesRouter.param('envelopeID', (req, res, next, envelopeID) => {
    const item = findItemById('envelopes', envelopeID);
    if (item === null) {
        res.status(404).send(`Requested item not found`);
    }
    else {
        req.item = item;
        next();
    }
});

// Get a single envelope by ID
envelopesRouter.get('/:envelopeID', (req, res) => {
    res.send(req.item);
})

// Update an envelopes details by ID
envelopesRouter.put('/:envelopeID', (req, res) => {
    // create function to update item in db
    updateItemInDatabase('envelopes', req.query, req.item);
})

// Update an envelopes spent ammount
// This is actually adding spendings to a desired category

// Delete an envelope by ID

// export router
module.exports = envelopesRouter;