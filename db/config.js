// mongo db connection
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        });

        console.log('Database connected');

    } catch (error) {

        console.log(error);
        throw new Error(' Error to connect DB ');
    }

}

module.exports = {
    dbConnection
}