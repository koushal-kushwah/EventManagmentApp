// signup.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(userData: any) {
    return this.http.post(`${this.baseUrl}/user/save`, userData);
  }
}
