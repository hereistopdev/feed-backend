const mongoose = require("mongoose");

// Define the User schema
const dataSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    feed: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Enable automatic timestamp management

// Create the model from the schema
const Data = mongoose.model("Data", dataSchema, "feeds");

module.exports = Data;
