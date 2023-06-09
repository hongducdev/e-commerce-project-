const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("Database connected!"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Database connection failed!");
    console.log(error);
  }
};

module.exports = dbConnect;
