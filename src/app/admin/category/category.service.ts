import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api = "http://localhost:3000/api/categories";

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.api);
  }

  addCategory(category: any) {
    return this.http.post(this.api, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateCategory(id: string, category: any) {

  return this.http.put(

    `${this.api}/${id}`,

    category

  );

}
}
