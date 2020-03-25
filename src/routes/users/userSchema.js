const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    favoriteProducts: {
      type: Array,
      required: true
    },
    viewedProducts: {
      type: Array,
      required: true
    },
    orders: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
