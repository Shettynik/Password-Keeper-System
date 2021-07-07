require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const cors = require("cors");
const path = require("path");

connectDB();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")))
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(process.exit(1))
});