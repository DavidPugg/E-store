const { session } = require("passport");
const Product = require("../models/productModel.js");

const itemsPerPage = 16;

const skipNumber = page => {
  let num = Number(page) * itemsPerPage - itemsPerPage;
  if (num < 0) {
    num = 0;
  }
  return num;
};

const calculatePages = productCount => {
  const pages = Math.trunc(productCount / itemsPerPage);
  if (productCount % itemsPerPage === 0) pages;
  return pages + 1;
};


const searchParams = query => {
  const { color, category, minPrice, maxPrice, input } = query;
  let searchParams = [];
  if (category !== "") {
    searchParams.push({ category });
  }
  if (color !== "") {
    searchParams.push({ "details.color": color });
  }
  if (maxPrice !== "" || minPrice !== "") {
    searchParams.push({ price: { $lt: maxPrice, $gt: minPrice } });
  }
  if (input !== "") {

    searchParams.push({ $text: { $search: `\"${input}\"` } });
  }

  if (searchParams.length < 1) return { undefined };
  return { $and: searchParams };
};

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const { page } = req.query;
      const params = searchParams(req.query);
      const productCount = await Product.find(params).count();
      const products = await Product.find(params, null, {
        skip: skipNumber(page),
        limit: itemsPerPage
      });
      const pages = calculatePages(productCount);
      res.json({ products, pages });
    } catch (err) {
      next(err);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).populate({
        path: "reviews",
        populate: { path: "author" }
      });
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  addToCart: async (req, res, next) => {
    try {
      const _id = req.body.id;
      const fullProduct = await Product.findById(_id);
      let qty = 1;
      let product = null;
      if (req.session.cart) {
        product = req.session.cart.find(p => p._id === _id);
      } else {
        req.session.cart = [];
      }
      if (product === null || product === undefined) {
        req.session.cart.push({ ...fullProduct._doc, qty });
      } else {
        let productIndex = req.session.cart.map(x => x._id).indexOf(_id);
        qty = product.qty + 1;
        req.session.cart.splice(productIndex, 1, { ...fullProduct._doc, qty });
      }
      res.json({ ...fullProduct._doc, qty });
    } catch (err) {
      next(err);
    }
  },
  changeQty: (req, res, next) => {
    try {
      const _id = req.body.id;
      const qty = req.body.qty;
      const productIndex = req.session.cart.map(x => x._id).indexOf(_id);
      const product = req.session.cart.find(p => p._id === _id);
      req.session.cart.splice(productIndex, 1, { ...product, qty });
      res.json({ cart: req.session.cart });
    } catch (err) {
      next(err);
    }
  },
  removeCartItem: (req, res, next) => {
    try {
      const { id } = req.body;
      const cartItemIndex = req.session.cart.map(x => x._id).indexOf(id);
      req.session.cart.splice(cartItemIndex, 1);
      res.json({ cart: req.session.cart });
    } catch (err) {
      next(err);
    }
  },
  getCart: (req, res, next) => {
    try {
      res.json(req.session.cart);
    } catch (err) {
      next(err);
    }
  }
};
