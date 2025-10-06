const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connection.on('connected', ()=>console.log('MongoDB connected successfully...'));

    mongoose.connect(`${process.env.MONGODB_URL}/sclrecords`);
}

module.exports = connectDB