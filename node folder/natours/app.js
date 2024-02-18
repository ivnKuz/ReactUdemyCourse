const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//1 MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
    console.log('middleware x');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
    
})


// 3 ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



module.exports = app;