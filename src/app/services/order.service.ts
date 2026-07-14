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

  return this.http.post(

    this.apiUrl + "/checkout",

    order

  );

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

cancelOrder(orderId: string) {

  return this.http.put(

    this.apiUrl + "/" + orderId + "/cancel",

    {}

  );

}

getAvailableDeliveries() {

  return this.http.get(

    this.apiUrl + "/available"

  );

}

acceptDelivery(orderId: string, courierId: string) {

  return this.http.put(

    this.apiUrl + "/" + orderId + "/accept",

    {

      courierId

    }

  );

}

getCourierDeliveries(courierId: string) {

  return this.http.get(

    this.apiUrl + "/courier/" + courierId

  );

}

updateDeliveryStatus(orderId: string, status: string) {

  return this.http.put(

    this.apiUrl + "/" + orderId + "/delivery-status",

    {

      status

    }

  );

}

}
