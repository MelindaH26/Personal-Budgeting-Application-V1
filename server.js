const express = require('express');
const app = express();
const PORT = 3000;

// require and mount budget router
const budgetRouter = require('./routers/budget');
app.use('/budget', budgetRouter);

// listen on specified port
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});