const mongoose = require("mongoose");
const url =
  "mongodb+srv://hereistopdev:8tfI1KJwMq87MzNT@cluster0.msopm3e.mongodb.net/test";

async function connectToDb() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = { connectToDb };
