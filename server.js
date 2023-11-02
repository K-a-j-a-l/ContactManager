const express = require("express");
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectToDB = require("./config/dbConnection")
const app = express();
const port = process.env.PORT || 5000;
connectToDB('mongodb://localhost:27017/Contacts-Backend').then(() => console.log("mongodb connected"))
app.use(express.json());
app.use(errorHandler)
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.listen(port, () => {
    console.log("Server is started")
})