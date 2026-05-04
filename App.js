const express = require("express");
const dotenv = require("dotenv");
dotenv.config();    

const createDatabase = require("./config/MongodbConnection.js")
const mongoose = require("mongoose");

const firmRoute = require("./routes/firmRoute.js")
const app = express();
const AuthUser = require("./routes/AuthRoute.js");
const vendorRoute = require("./routes/VendorRoute.js");
const productRoute = require("./routes/productRoute.js");
const path = require("path");

app.use(express.json());
app.use("/api/auth", AuthUser);
app.use("/api/vendor", vendorRoute);
app.use("/api/product", productRoute);
app.use("/api/firm", firmRoute)

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 5000, () => {

    console.log("Server Started");
    createDatabase();
})

app.get("/", (req, res) => {
    res.send("Hello World");
}   )