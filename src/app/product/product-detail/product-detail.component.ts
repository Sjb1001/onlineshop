import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  reviews: any[] = [];
averageRating = 0;

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private productService: ProductService,
  private cartService: CartService,
  private reviewService: ReviewService
) {}

  ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('id');

  if (!id) {
    return;
  }

  this.productService.getProduct(id).subscribe({

    next: (data: any) => {

      this.product = data;

    },

    error: (err) => {

      console.log(err);

    }

  });

  this.reviewService.getProductReviews(id).subscribe({

    next: (data: any) => {

      this.reviews = data;

      if (this.reviews.length > 0) {

        const total = this.reviews.reduce(

          (sum: number, review: any) => sum + review.rating,

          0

        );

        this.averageRating = total / this.reviews.length;

      }

    },

    error: (err) => {

      console.log(err);

    }

  });

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
