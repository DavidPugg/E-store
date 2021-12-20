const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

module.exports = {
  addReview: async (req, res, next) => {
    try {
      if (!req.user) {
        res.json({ error: "You must be logged in to review." });
        return;
      }
      const productId = req.params.id;
      const userOrders = req.user.orders;
      const orders = await Order.find({ _id: { $in: userOrders } }).populate({
        path: "products",
        populate: { path: "data" }
      });
      const product = await Product.findById(productId).populate("reviews");
      let products = [];
      for (order of orders) {
        for (p of order.products) {
          products.push(p.data._id);
        }
      }
      const sameProduct = products.find(p => p == productId);
      if (sameProduct == undefined) {
        res.json({ error: "You must purchase the product first." });
        return;
      }
      const hasReviewed = product.reviews
        .map(x => x.author)
        .find(x => x == req.user.id);

      if (hasReviewed != undefined) {
        res.json({ error: "You have already reviewed this product." });
        return;
      }
      const { review, rating } = req.body;
      const author = req.user;
      const finalReview = new Review({
        review,
        rating,
        author
      });
      product.reviews.push(finalReview);
      await product.save();
      await finalReview.save();
      res.json(finalReview);
    } catch (err) {
      next(err);
    }
  },
  deleteReview: async (req, res, next) => {
    try {
      const { reviewId } = req.body;
      const productId = req.params.id;
      const review = await Review.findById(reviewId);
      if (review.author.equals(req.user._id)) {
        await review.remove();
        const product = await Product.findById(productId);
        const reviewIndex = product.reviews.indexOf(reviewId);
        product.reviews.splice(reviewIndex, 1);
        await product.save();
        res.json("Review succesfully deleted.");
      } else {
        res.json("Review was not deleted.");
      }
    } catch (err) {
      next(err);
    }
  }
};
