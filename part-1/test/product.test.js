const { saveProduct, generateHash, getMinutes, getProductByHash, checkProductHash } = require('../src/controllers/product');
const mongoose = require('mongoose');

describe('product controller test', () => {
  mongoose.connect(`mongodb://localhost:27017/challenge`, { useNewUrlParser: true, useUnifiedTopology: true });

  describe('saveProduct method testing', () => {
    test('should save the product if it has a valid body and hash', async () => {
      const body = { name: 'mesa', price: 200 }  
      const hash = 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9';
  
      const savedProduct = await saveProduct(body, hash);
  
      expect(savedProduct).toBeDefined();
      expect(savedProduct).toBeTruthy();
    });
  });

  describe('generateHash method testing', () => {
    test('should generate a hash for each product', async () => {
      const hash = 'eyJuYW1lIjoidGVzdGUiLCJwcmljZSI6MTIwfQ==';

      expect(await generateHash({ name: 'teste', price: 120 })).toBe(hash);
    });  
  });

  describe('getProductByHash method testing', () => {
    test('should get the product by its hash', async () => {
      const newProduct = await saveProduct({ name: 'mesa', price: 400 }, 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9');      
      const { _id, hash }  = newProduct;      
      const fromHash = await getProductByHash(hash);

      expect(_id.toString()).toBe(fromHash[0]._id.toString());
    });  
  });
  
  describe('getMinutes method testing', () => {
    test('difference between two dates should be 10 minutes', () => {
      const currentDate = new Date(1606681548999);
      const tenMinutesEarly = new Date(currentDate - (60000 * 10));

      const dateDiff = getMinutes(currentDate, tenMinutesEarly);
      
      expect(dateDiff).toBeDefined();
      expect(dateDiff).toBe(10);
    });
  });

  describe('checkProductHash method testing', () => {
    test('should verify that 10 minutes have passed since the last product was added', async () => {
      const newProduct = await saveProduct({ name: 'cadeira', price: 70 }, 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9');
      const { hash } = newProduct;
      
      expect(await checkProductHash(hash)).toBe(true);
    });
  });
});