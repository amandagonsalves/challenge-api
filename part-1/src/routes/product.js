const express = require('express');
const router = express.Router();

const addProduct = require('../controllers/product');

router.post('/v1/products', async (req, res) => {
  await addProduct(req.body);
});

module.exports = router;