import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProduct(id).subscribe((data: any) => {
        this.product = data;
      });
    }
  }

  addToCart() {
    if (!this.product) {
      return;
    }

    const customerId = localStorage.getItem('userId');

    if (!customerId) {
      alert('Please login first.');
      return;
    }

    const cartItem = {
      customer: customerId,
      product: this.product._id
    };

    this.cartService.addtoCart(cartItem).subscribe({
      next: () => {
        alert(this.product.productName + ' added to cart!');
        this.router.navigate(['/cart']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  buyNow(): void {
    this.router.navigate(['/checkout']);
  }
}
