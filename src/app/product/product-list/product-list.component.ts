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

  products: Product[] = []

  constructor(private productService: ProductService, private cartService: CartService){

  }

  ngOnInit(): void {
  this.productService.getProducts().subscribe(data => {
    console.log(data);
    this.products = data;
  });

}
addToCart(product: Product): void {
  this.cartService.addtoCart(product).subscribe({
    next: () => {
      alert(product.name + ' added to cart!');
    },
    error: (err) => {
      console.error(err);
    }
  });
}


}
