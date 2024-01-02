const express = require('express');
const envelopesRouter = express.Router();

// Import database helpers
const {getAllDBItems, findItemById} = require('../database/data');

// Get all envelopes
envelopesRouter.get('/', (req, res) => {
    const envelopes = getAllDBItems('envelopes');
    if (envelopes !== null) {
        res.send(envelopes);
    } else {
        res.status(404).send(`Requested data not found`);
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

// Create a new envelope

// Update an envelope by ID

// Delete an envelope by ID

// export router
module.exports = envelopesRouter;