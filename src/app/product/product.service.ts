import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl + "/products";

  constructor(private http: HttpClient) { }

  createProduct(product: FormData) {
  return this.http.post(this.apiUrl, product);
}

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductsByStore(storeId: string) {
    return this.http.get(this.apiUrl + "/store/" + storeId);
  }

  getProduct(id: string) {
    return this.http.get(this.apiUrl + "/" + id);
  }

  updateProduct(id: string, product: FormData) {
  return this.http.put(this.apiUrl + "/" + id, product);
}

  deleteProduct(id: string) {
  return this.http.delete(this.apiUrl + "/" + id);
}

}
