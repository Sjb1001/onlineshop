export interface Product {

  _id?: string;

  productName: string;

  description: string;

  price: number;

  stock: number;

  image: string;

  category: {
    _id: string;
    name: string;
  };

  store: {
    _id: string;
    storeName: string;
  };

  averageRating?: number;

reviewCount?: number;
}
