const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// require and mount budget router
const budgetRouter = require('./routers/budget');
app.use('/budget', budgetRouter);

// listen on specified port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});