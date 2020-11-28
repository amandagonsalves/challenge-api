const Product = require('./../models/product.js');

async function addProduct(body) {
  const product = new Product({
    body
  });

  await product.save();

  return product;
};

module.exports = addProduct;