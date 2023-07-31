const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@main.wwymhgd.mongodb.net/?retryWrites=true&w=majority`, {});
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log('Conectado ao MongoDb usando o mongoose')
    }
}

module.exports = connectToDatabase;