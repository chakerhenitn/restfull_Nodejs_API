const mongoose = require('mongoose');

module.exports = ()=> {


    mongoose.connect(process.env.MONGODB_URL,
{
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
}

)
.then(()=>{
    console.log('Mongodb is connected');
})
.catch(err => console.log(err.message));

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected to db');
})

mongoose.connection.on('error', err =>{
    console.log(err.message);
})

mongoose.connection.on('disconnected', err =>{
    console.log('Mongoose is disconnected');
})
process.on('SIGINT', () =>{
    mongoose.connection.close();
    console.log('Mongoose is disconnected after an APP termination');  
process.exit(0);


});
}