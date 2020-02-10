const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.SECRET
};
