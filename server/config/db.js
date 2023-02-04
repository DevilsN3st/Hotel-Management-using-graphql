const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost/graphql-hotel-main-project");

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
