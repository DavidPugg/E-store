const mongoose = require("mongoose");
const Product = require("../models/productModel");
const products = require("./seedData");

mongoose.connect(
  "mongodb+srv://David:fUZ5M8msdfgC0cFT@cluster0.9kges.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connected!");
});

const seedDataBase = async () => {
  await Product.deleteMany({});
  for (product of products) {
    product.description =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, ipsa dicta! Fugit quasi cupiditate odio exercitationem voluptate fugiat quia molestias. Magni, soluta. Beatae quis hic natus! Maxime earum nesciunt magni. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, ipsa dicta! Fugit quasi cupiditate odio exercitationem voluptate fugiat quia molestias. Magni, soluta. Beatae quis hic natus! Maxime earum nesciunt magni.";
    const newProduct = new Product(product);
    await newProduct.save();
  }
};

seedDataBase();
