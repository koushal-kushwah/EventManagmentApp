// events.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:3000/event'; 

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fetchall`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/fetch/${id}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, eventData);
  }

  updateEvent(eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/:id`, eventData);
  }

  deleteEvent(eventData: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${eventData.id}`);
  }
}









// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventsService {
//   private apiUrl = 'http://lochalhost:3000/events';

//   constructor(private http: HttpClient) { }

//   fetchAllEvents(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/fetchall`);
//   }

//   addEvent(eventData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/save`, eventData);
//   }

//   updateEvent(eventId: number, eventData: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/update/${eventId}`, eventData);
//   }

//   deleteEvent(eventId: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/delete/${eventId}`);
//   }
// }




// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class EventsService {
// //   private baseUrl = 'http://localhost:3000'; 

// //   constructor(private http: HttpClient) { }

// //   fetchAllEvents(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.baseUrl}/event/fetchall`);
// //   }
// // }
