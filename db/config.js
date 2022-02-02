// mongo db connection
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        //await mongoose.connect( process.env.MONGODB_CNN, {
        await mongoose.connect( 'mongodb+srv://user_restserver_node:8a-xRqFgHqr-NMp@miclustercafe.bzfap.mongodb.net/miDB', {

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