const express = require('express');
const budgetRouter = express.Router();
const envelopesRouter = require('./envelopes');

// Mount Envelopes Router
budgetRouter.use('/envelopes', envelopesRouter);

// export router
module.exports = budgetRouter;