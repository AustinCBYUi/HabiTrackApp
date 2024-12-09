const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habits');
require('dotenv').config();

const app = express();

//Database env reference.
let mongo_uri = process.env.MONGO_URI;

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//MongoDB Connection
mongoose
  .connect(mongo_uri)
  .then(() => console.log(`Connected to DB successfully on ${Date()}`))
  .catch((err) => console.error('MongoDB connection error:', err));

//Routes
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/habits', habitRoutes);

//Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
