import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = environment.apiUrl + "/reviews";

  constructor(private http: HttpClient) {}

  addReview(review: any) {
    return this.http.post(this.apiUrl, review);
  }

  getProductReviews(productId: string) {
    return this.http.get(this.apiUrl + "/product/" + productId);
  }

}
