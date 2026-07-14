import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  productId = '';

  rating = 5;

  comment = '';

  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private reviewService: ReviewService

  ) {

    this.route.queryParams.subscribe(params => {

  this.productId = params['productId'];

  console.log("Product ID:", this.productId);

});

  }



  submitReview() {

    if (!this.productId) {

    alert("Product ID not found.");

    return;

  }

    const customerId = localStorage.getItem("userId");

     if (!customerId) {

    alert("Please login first.");

    return;

  }

    const review = {

      product: this.productId,

      customer: customerId,

      rating: this.rating,

      comment: this.comment

    };

    this.reviewService.addReview(review).subscribe({

      next: () => {

        alert("Review submitted!");

        this.router.navigate(['/my-orders']);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
