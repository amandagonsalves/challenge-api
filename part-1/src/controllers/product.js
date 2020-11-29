const Product = require('./../models/product.js');

async function saveProduct(body, hash) {
  const product = new Product({
    body,
    hash,
  });

  await product.save();
       
  return product;
}

function generateHash(product) {
  return Buffer.from(JSON.stringify(product)).toString('base64');
}

function getProductByHash(hash) {
  return Product.find( { hash } ).sort({ createdAt: -1 }).limit(1).exec();
}

function getMinutes(now, lastProductTime) {
  const time = now - lastProductTime;
  return Math.floor(time / 60000);
}

async function checkProductHash(hash) {
  const lastProductAdded = await getProductByHash(hash);

  if(lastProductAdded.length > 0 && getMinutes(Date.now(), lastProductAdded[0].createdAt) < 10) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  saveProduct,
  generateHash,
  checkProductHash
}