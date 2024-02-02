const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8081;

app.use("/hms/");

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
