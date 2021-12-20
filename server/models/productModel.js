const { model, Schema } = require("mongoose");
const Review = require("./reviewModel");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  details: {
    color: { type: String, required: true }
  }
});
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = model("Product", productSchema);
