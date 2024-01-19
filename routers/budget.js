const express = require('express');
const budgetRouter = express.Router();
const envelopesRouter = require('./envelopes');
const spendingsRouter = require('./spendings');

// Mount Envelopes Router
budgetRouter.use('/envelopes', envelopesRouter);

// Mount Spendings router
budgetRouter.use('/spendings', spendingsRouter);

// export router
module.exports = budgetRouter;