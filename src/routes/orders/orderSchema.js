const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../../helpers/setTimestamp");

const orderSchema = new Schema({
  creator: {
    type: String,
    required: true
  },
  productsList: {
    type: [
      {
        product: {
          type: String,
          required: true
        },
        type: {
          type: String,
          required: true
        },
        itemsCount: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  deliveryType: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  sumToPay: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

orderSchema.plugin(timestamp);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
