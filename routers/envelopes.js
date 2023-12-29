const express = require('express');
const envelopesRouter = express.Router();

// Import database data
const data = require('../database/data');
const findItemById = require('../database/data-helpers');

// Get all envelopes
envelopesRouter.get('/', (req, res) => {
    const envelopes = data.envelopes;
    if (envelopes) {
        res.send(envelopes);
    } else {
        res.status(404).send('envelopes no found');
    }
});

// Check if envelope with the id exists
envelopesRouter.param('envelopeID', (req, res, next, envelopeID) => {
    const item = findItemById('envelopes', envelopeID);
    res.send(item);
});

// Get a single envelope by ID
envelopesRouter.get('/:envelopeID', (req, res) => {

})

// Update and envelope by ID

// Delete an envelope by ID

// export router
module.exports = envelopesRouter;