const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDb Connected');
  } catch (err) {
    console.err(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
