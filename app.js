const express = require('express');
const app = express();
const createError = require('http-errors');
const dotenv = require('dotenv').config();

// using environment variable
console.log(dotenv.parsed);
//
//midlware
app.use(express.json());
app.use(express.urlencoded({extended: true}));  

// initializing the DB connection from initDB file

require('./initDB')();

//
const ProductRoute = require('./routes/Product.route')

app.use('/products', ProductRoute);

app.use((req, res, next)=>{
    /* const err = new Error('Not found')
    err.status = 404
    next(err) */
// using http-errors 
    next(createError(404, 'Not found'));
});
// error handler middleware
app.use((err, req, res, next)=>{
res.status(err.status || 500)
res.send({
    error: {
        status: err.status || 500,
        message: err.message
    }
});
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('server strated on port'+ PORT );
});