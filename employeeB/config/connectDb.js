const mongoose = require("mongoose");

const connectDb = async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
};

module.exports = connectDb;
