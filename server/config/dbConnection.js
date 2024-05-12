const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database Connected ",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        // Check if it's a MongooseServerSelectionError and log specific details
        if (err.name === "MongooseServerSelectionError") {
            console.log("MongooseServerSelectionError:", err.message);
        } else {
            console.log("Error:", err);
        }
        process.exit(1);
    }
};

module.exports = connectDb;
