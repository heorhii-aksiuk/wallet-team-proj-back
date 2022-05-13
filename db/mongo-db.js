const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose: Database connection successful.');
});

mongoose.connection.on('error', error => {
  console.log(`Mongoose: Error Database connection: ${error.message}.`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose: Database connection terminated.');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Database connection terminated.');
    process.exit(1);
  });
});

module.exports = db;