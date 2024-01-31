import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  fetchAllGuests() {
    return this.http.get(`${this.baseUrl}/guest/fetchall`);
  }

  addGuest(newGuest: any) {
    return this.http.post(`${this.baseUrl}/guest/save`, newGuest);
  }

  updateGuest(id: number, updatedGuest: any) {
    return this.http.put(`${this.baseUrl}/guest/update/${id}`, { id, ...updatedGuest });
  }

  deleteGuest(id: number) {
    return this.http.delete(`${this.baseUrl}/guest/delete/${id}`);
  }
}
