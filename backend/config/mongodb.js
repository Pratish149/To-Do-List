require("dotenv").config();
const mongoose = require("mongoose");
const mongodbUrl = process.env.MONGO_URL;

mongoose.connect(mongodbUrl);
