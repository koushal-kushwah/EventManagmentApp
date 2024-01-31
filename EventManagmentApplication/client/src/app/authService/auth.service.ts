
// import { Injectable } from '@angular/core';
// import { HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private token: string | null = null;

//   setToken(token: string) {
//     this.token = token;
//     localStorage.setItem('token', token);
//   }

//   getToken(): HttpHeaders {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       return new HttpHeaders({
//         'Authorization': `Bearer ${storedToken}`
//       });
//     } else {
//       return new HttpHeaders();
//     }
//   }

//   clearToken() {
//     this.token = null;
//     localStorage.removeItem('token');
//   }
// }


// ########################### service for show expired message ##################################################



import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): HttpHeaders{
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Check if the token is expired here
      const tokenExpirationDate = this.getTokenExpirationDate(storedToken);
      if (tokenExpirationDate && new Date() > tokenExpirationDate) {
        this.clearToken();
        return new HttpHeaders(); // Token is expired
      }
      return new HttpHeaders({
        'Authorization': `Bearer ${storedToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Add a method to get the token expiration date from the token payload
  private getTokenExpirationDate(token: string): Date | null {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload && payload.exp) {
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(payload.exp);
        return expirationDate;
      }
    }
    return null;
  }
}












// ############################Auth Service 1 ##################################################
// // import { Injectable } from '@angular/core';
// // import { HttpHeaders } from '@angular/common/http';


// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {

// //   constructor() { }

// //   private token:any;
// //   private header:any;

// //   setToken(token: any) {
// //     this.token = token;
// //     console.log("manik mam",token)
// //     var getnewtoken = localStorage.setItem('token',token);
// //     console.log('getnewtoken',getnewtoken);

// //   }

// //   getToken() {
// //     if (this.token) {
// //       return new HttpHeaders({
// //         'Authorization': `${this.token}`
// //       });
// //     } else {
// //       return new HttpHeaders();
// //     }
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private token: string | null = null;

//   setToken(token: string) {
//     this.token = token;
//     localStorage.setItem('token', token);
//   }

//   getToken(): HttpHeaders {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       return new HttpHeaders({
//         'Authorization': `Bearer ${storedToken}`
//       });
//     } else {
//       return new HttpHeaders();
//     }
//   }

//   clearToken() {
//     this.token = null;
//     localStorage.removeItem('token');
//   }
// }

