import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  searchText = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService){

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data as Product[];
      this.filteredProducts = [...this.products];
      console.log(this.products);
    });
  }
addToCart(product: Product): void {

  const customerId = localStorage.getItem("userId");

  if (!customerId) {
    alert("Please login first.");
    return;
  }

  const cartItem = {
    customer: customerId,
    product: product._id
  };

  this.cartService.addtoCart(cartItem).subscribe({

    next: () => {

      alert(product.productName + " added to cart!");

    },

    error: (err) => {

      console.error(err);

    }

  });

}

searchProducts() {

  console.log("Searching:", this.searchText);

  const keyword = this.searchText.toLowerCase();

  this.filteredProducts = this.products.filter(product =>
    product.productName.toLowerCase().includes(keyword)
  );

  console.log(this.filteredProducts);

}


}
