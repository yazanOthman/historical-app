const mongoose = require("mongoose");

const placesSchema = new mongoose.Schema({
  name: String,
  visited: Boolean,
  information: String,
  image: String,
});

module.exports = mongoose.model("places", placesSchema);
