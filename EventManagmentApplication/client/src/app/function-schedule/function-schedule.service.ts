import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FunctionScheduleService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  fetchAllFunctionSchedules() {

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

    return this.http.get(`${this.baseUrl}/function/fetchall`,{headers});
  }

  addFunctionSchedule(newFunctionSchedule: any) {

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

    return this.http.post(`${this.baseUrl}/function/save`, newFunctionSchedule, {headers});
  }

  // updateFunctionSchedule(id: number, updatedFunctionSchedule: any) {

  //   const tokent = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //       'Authorization': `${tokent}` // Assuming it's a Bearer token
  //      });

  //   return this.http.put(`${this.baseUrl}/function/update/:id`, { id, ...updatedFunctionSchedule }, {headers});
  // }

  deleteFunctionSchedule(id: number) {

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

    return this.http.delete(`${this.baseUrl}/function/delete/${id}`,{headers});
  }
  
}


