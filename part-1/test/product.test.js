const product = require('../src/controllers/product');
const Product = require('../src/models/product');

describe('product controller test', () => {
  describe('saveProduct method testing', () => {
    test('should save the product if it has a valid body and hash', () => {
      const body = {
        name: 'mesa',
        price: 400
      }
  
      const hash = 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9';
  
      const savedProduct = product.saveProduct(body, hash);
  
      expect(savedProduct).toBeDefined();
      expect(savedProduct).toBeTruthy();
    });
  });

  describe('generateHash method testing', () => {
    test('should generate a hash for each product', async () => {
      const hash = 'eyJuYW1lIjoidGVzdGUiLCJwcmljZSI6MTIwfQ==';

      expect(await product.generateHash({ "name": "teste", "price": 120 })).toBe(hash);
    });  
  });

  describe('getProductByHash method testing', () => {
    test('', async () => {
      /* const newProduct = new Product({
        body: {
          name: 'mesa',
          price: 400
        },
        hash: 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9'
      });
 */
      const newProduct = await product.saveProduct({
        name: 'mesa',
        price: 400
      }, 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9');

      const id = newProduct._id;

      expect(id).toBe(await product.getProductByHash(newProduct.hash));
    });  
  });
  
  describe('getMinutes method testing', () => {
    test('difference between two dates should be 10 minutes', () => {
      const currentDate = new Date(1606681548999);
      const tenMinutesEarly = new Date(currentDate - (60000 * 10));

      const dateDiff = product.getMinutes(currentDate, tenMinutesEarly);
      
      expect(dateDiff).toBeDefined();
      expect(dateDiff).toBe(10);
    });
  });

  /* describe('checkProductHash method testing', () => {
    test('should verify that 10 minutes have passed since the last product was added', () => {
      const hash = 'eyJuYW1lIjoibWVzYSIsInByaWNlIjo0MDB9'

      expect( product.checkProductHash(hash)).toBe(false);
    });  
  }); */
});