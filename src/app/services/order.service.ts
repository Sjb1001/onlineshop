import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl + "/orders";

  constructor(private http: HttpClient) { }

  placeOrder(order: any) {
    return this.http.post(this.apiUrl, order);
  }

  getCustomerOrders(customerId: string) {
    return this.http.get(this.apiUrl + "/customer/" + customerId);
  }

  getStoreOrders(storeId: string) {
    return this.http.get(this.apiUrl + "/store/" + storeId);
  }

  updateOrderStatus(orderId: string, status: string) {

  return this.http.put(this.apiUrl + "/" + orderId + "/status", {

    status

  });

}

  checkout(customer: string) {

  return this.http.post(this.apiUrl + "/checkout", {

    customer

  });

}

}
