import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Register
  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Get all sellers
  getSellers() {
    return this.http.get<any[]>(`${this.apiUrl}/sellers`);
  }

   updateSellerStatus(id: string, status: string) {
    return this.http.put(
      `${this.apiUrl}/status/${id}`,
      { status }
    );
  }

}
