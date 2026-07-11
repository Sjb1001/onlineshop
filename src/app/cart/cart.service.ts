import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.apiUrl + "/cart";

  constructor(private http: HttpClient) { }

  addtoCart(cartItem: any) {
  return this.http.post(this.apiUrl, cartItem);
}

  getCartItems(customerId: string) {
  return this.http.get(this.apiUrl + "/" + customerId);
}

  increaseQuantity(id: string) {
  return this.http.put(this.apiUrl + "/" + id + "/increase", {});
}

  decreaseQuantity(id: string) {
  return this.http.put(this.apiUrl + "/" + id + "/decrease", {});
}

  removeFromCart(id: string) {
    return this.http.delete(this.apiUrl + "/" + id);
  }

  clearCart() {
    const customerId = localStorage.getItem('userId');
    return this.http.delete(`${this.apiUrl}/customer/${customerId}`);
  }

}
