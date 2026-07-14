import { Product } from './product';

describe('Product', () => {
  it('should create a valid product object', () => {
    const product: Product = {
      productName: 'Test Product',
      description: 'A test product',
      price: 10,
      stock: 5,
      image: 'test.png',
      category: { _id: 'cat1', name: 'Test Category' },
      store: { _id: 'store1', storeName: 'Test Store' }
    };
    expect(product).toBeTruthy();
  });
});
