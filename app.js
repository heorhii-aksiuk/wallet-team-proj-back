require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const boolParser = require('express-query-boolean');
const cookieParser = require('cookie-parser');

const db = require('./db/mongo-db');
const { Limits } = require('./config/limits');
const HttpCodes = require('./helpers/http-codes');
const Ports = require('./helpers/ports');

const PORT = process.env.PORT || Ports.DEFAULT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: Limits.JSON }));
app.use(boolParser());
app.use(cookieParser());

// 404 Not found
app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({
    status: 'error',
    code: HttpCodes.NOT_FOUND,
    message: 'Not Found.',
  });
});

// Central errors handling
app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: statusCode === HttpCodes.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: statusCode,
    message: err.message,
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const startServer = async () => {
  try {
    await db;
    app.listen(PORT, () => console.log('Server running on port: ', PORT));
  } catch (error) {
    console.log('Error in startServer: ', error.message);
  }
};

startServer();

module.exports = app;