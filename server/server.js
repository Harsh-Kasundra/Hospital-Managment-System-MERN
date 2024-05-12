const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();

const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());

app.use(cors());

app.use("/hms/user", require("./routes/userRoutes"));
app.use("/hms/staff", require("./routes/staffRoutes"));
app.use("/hms/staffLogin", require("./routes/staffLoginRoutes"));
app.use("/hms/admin", require("./routes/adminRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`);
});
