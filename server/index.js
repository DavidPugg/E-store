const express = require("express");
const app = express();

require("dotenv").config();
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/e-store";
const secret = process.env.SECRET || "verybadsecret";

//npm
const session = require("express-session");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const passport = require("passport");
const LocalStrategy = require("passport-local");

//my stuff
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");

//Mongo
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connected!");
});

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
});
store.on("error", () => {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store
};

//

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

//passport stuff
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products/:id/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error!";
  res.status(status).json(message);
});

module.exports = app;
