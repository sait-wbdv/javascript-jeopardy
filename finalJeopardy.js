const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const { User, generateSlugsForUser } = require("./model/User");

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/users", async (req, res) => {
  generateSlugsForUser();
  const result = await User.find().limit(25);
  res.json({ users: result });
});

app.get("/users/user/:slug", async (req, res) => {
  try {
    const result = User.findOne({ slug: req.params.user });
    res.json({ users: result });
  } catch (error) {
    console.error("Error: " + error);
  }
});

connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Listening on https://${PORT}`);
  });
});
