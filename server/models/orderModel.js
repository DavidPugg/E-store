const mongoose = require('mongoose')
const { model, Schema, SchemaTypes } = mongoose;
require('mongoose-double')(mongoose)
const Product = require('../models/productModel');

orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mailingInfo: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    },
  },
  paymentMethod: {
    type: String,
    required: true
  },
  products: [
    {
      data: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  price: {
    type: SchemaTypes.Double,
    required: true
  }
});

module.exports = model("Order", orderSchema);
