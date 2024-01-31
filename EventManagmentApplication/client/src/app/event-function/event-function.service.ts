import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventFunctionService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  

  getEventFunctions(): Observable<any[]> {

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

    return this.http.get<any[]>(`${this.apiUrl}/efunction/fetchall`,{headers});
  }

  addEventFunction(eventFunctionData: any): Observable<any> {

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

    console.log(eventFunctionData)
    return this.http.post<any>(`${this.apiUrl}/efunction/save`, eventFunctionData,{headers});
  }

  // updateEventFunction(eventFunctionId: number, eventFunctionData: any): Observable<any> {

  //   const tokent = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //       'Authorization': `${tokent}` // Assuming it's a Bearer token
  //      });

  //   return this.http.put<any>(`${this.apiUrl}/efunction/update`, { ...eventFunctionData, id: eventFunctionId },{headers});
  // }

  deleteEventFunction(eventFunctionId: number): Observable<any> {

    const tokent = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': `${tokent}` // Assuming it's a Bearer token
         });

    return this.http.delete<any>(`${this.apiUrl}/efunction/delete/${eventFunctionId}`,{headers});
  }
}
















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class EventFunctionService {
//   private apiUrl = 'http://localhost:3000'; 

//   constructor(private http: HttpClient) {}

//   getEventFunctions(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/efunction/fetchall`);
//   }
// }
