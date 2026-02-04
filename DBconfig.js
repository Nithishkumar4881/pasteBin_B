const mongoose = require("mongoose");
require("dotenv").config();

async function dbconnection() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}pastebin`);
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
}

module.exports = dbconnection;
