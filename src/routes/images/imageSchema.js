const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../../helpers/setTimestamp");

const imageSchema = new Schema({
  file: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});
imageSchema.plugin(timestamp);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
