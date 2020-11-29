const express = require('express');
const router = express.Router();

const { saveProduct, generateHash, checkProductHash } = require('../controllers/product');

router.post('/v1/products', async (req, res) => {
  const { body } = req;
  const bodyAsArray = Array.isArray(body) ? body : [body];

  for (const product of bodyAsArray) {
    const hash = generateHash(product);

    if (await checkProductHash(hash)) {
      continue;
    }

    await saveProduct(product, hash);
  }

  res.send('ok');
});

module.exports = router;