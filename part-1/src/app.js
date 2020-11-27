const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://localhost:27017/challenge`, { useNewUrlParser: true, useUnifiedTopology: true });

const productRoute = require('./routes/product');

app.use(productRoute);

app.listen(3000, () => {
  console.log('server is running on port 3000');
});