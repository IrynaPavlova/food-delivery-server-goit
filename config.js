require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  mongodbUrl: process.env.MONGODB_URI || 'mongo://localhost:27017/pizza',
  secret: process.env.JWT_SECRET_KEY || 'foSec'
};
