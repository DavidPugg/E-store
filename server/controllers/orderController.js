const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require('../models/productModel');

module.exports = {
  completeOrder: async (req, res, next) => {
    try {
      const { mailingInfo, paymentInfo } = req.body
      const paymentMethod = paymentInfo.paymentMethod
      const user = req.user ? req.user._id : null;
      const products = req.session.cart.map(x => {
        const container = {
          data: x,
          qty: x.qty
        }
        return container;
      });
      let price = 0;
      for (let product of products) {
        price += product.data.price * product.qty;
      }
      price = Math.round(price * 100) / 100;
      const order = new Order({
        user,
        mailingInfo,
        paymentMethod,
        products,
        price
      });
      const completedOrder = await order.save();
      console.log(completedOrder)
      req.session.cart = []
      if (req.isAuthenticated()) {
        const currentUser = await User.findById(req.user.id);
        currentUser.orders.push(completedOrder);
        await currentUser.save();
      }
      res.json(completedOrder);
    } catch (err) {
      next(err);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orderIds = req.user.orders;
      const orders = await Order.find({ _id: { $in: orderIds  } }).populate({path: 'products', populate: {path: 'data'}});
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }
};
