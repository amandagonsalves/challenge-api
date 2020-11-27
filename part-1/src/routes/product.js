const express = require('express');
const router = express.Router();

const productController = require('./../controllers/product');

router.post('/v1/products', (req, res) => {
  productController.new(req, res);/* 
  res.send('hello'); */
});

module.exports = router;