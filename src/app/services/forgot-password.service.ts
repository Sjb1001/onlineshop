import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  getQuestion(email: string) {
    return this.http.post<{ question: string }>(`${this.api}/forgot-password`, {
      email
    });
  }

  verifyAnswer(data: any) {
    return this.http.post(`${this.api}/verify-answer`, data);
  }

  resetPassword(data: any) {
    return this.http.post(`${this.api}/reset-password`, data);
  }

}
