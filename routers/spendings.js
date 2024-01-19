const express = require('express');
const spendingsRouter = express.Router();

// Impoty required database helpers
const {addItemToDatabase} = require('../database/data');

spendingsRouter.post('/', (req, res) => {
    res.send('it worked');
});

module.exports = spendingsRouter;