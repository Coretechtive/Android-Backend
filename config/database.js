const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

const { MONGO_URI } = process.env;

const connectToMongo = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};

module.exports = connectToMongo;