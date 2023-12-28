const express = require('express');
const app = express();
const PORT = 3000;

// require and mount budget router
const budgetRouter = require('./routers/budget');
app.use('/budget', budgetRouter);

// TEST to get all envelopes
const data = require('./data');
budgetRouter.get('/envelopes', (req, res) => {
    const envelopes = data.envelopes;
    if (envelopes) {
        res.send(envelopes);
    } else {
        res.status(404).send('envelopes no found');
    }
});

// listen on specified port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
