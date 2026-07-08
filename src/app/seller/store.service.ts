import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private apiUrl = environment.apiUrl + "/stores";

  constructor(private http: HttpClient) { }

  createStore(store: any) {
    return this.http.post(this.apiUrl, store);
  }

  getStores() {
    return this.http.get(this.apiUrl);
  }

  approveStore(id: string) {
  return this.http.put(this.apiUrl + "/" + id + "/approve", {});
}

rejectStore(id: string) {
  return this.http.put(this.apiUrl + "/" + id + "/reject", {});
}

  getStoreByOwner(ownerId: string) {
  return this.http.get(this.apiUrl + "/owner/" + ownerId);
}

assignCategories(storeId: string, allowedCategories: string[]) {
  return this.http.put(
    this.apiUrl + "/" + storeId + "/categories",
    { allowedCategories }
  );
}

getStore(id: string) {
  return this.http.get(this.apiUrl + "/" + id);
}

}
