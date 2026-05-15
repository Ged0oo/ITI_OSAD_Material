const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Product = require('./models/Product');
const { createProduct, getAvailableProducts, discontinue, } = require('./services/productService');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('productService', () => {
  test('createProduct — happy path', async () => {
    const product = await createProduct({name: 'Laptop', slug: 'laptop-1', price: 1000, });
    expect(product.name).toBe('Laptop');
    expect(product.slug).toBe('laptop-1');
    expect(product.inStock).toBe(true);
  });

  test('createProduct — duplicate slug', async () => {
    await createProduct({ name: 'Phone', slug: 'phone-1', price: 500, });
    await expect(createProduct({ name: 'Another Phone', slug: 'phone-1', price: 600, })).rejects.toThrow('Slug already in use');
  });

  test('createProduct — schema validation (negative price)', async () => {
    await expect(createProduct({ name: 'Bad Product', slug: 'bad-product', price: -10,})).rejects.toThrow('min');
  });

  test('getAvailableProducts — only inStock true', async () => {
    await Product.create([
      { name: 'A', slug: 'a', price: 10, inStock: true },
      { name: 'B', slug: 'b', price: 20, inStock: false },
      { name: 'C', slug: 'c', price: 30, inStock: true },
    ]);

    const products = await getAvailableProducts();

    expect(products.length).toBe(2);
    expect(products.every(p => p.inStock === true)).toBe(true);
  });

  test('discontinue — sets inStock to false', async () => {
    await Product.create({ name: 'Item', slug: 'item-1', price: 100, inStock: true, });
    const updated = await discontinue('item-1');
    expect(updated.inStock).toBe(false);
  });

  test('discontinue — product not found', async () => {
    await expect(discontinue('unknown-slug')).rejects.toThrow('Product not found');
  });
});