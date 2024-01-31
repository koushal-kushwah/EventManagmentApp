import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly apiurl = 'http://localhost:3000/event/fetchall';
  users: any;
  eventpar: any;
  userName: any;

  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) { }

  signout() {
    const extras: NavigationExtras = {
      replaceUrl: true,
    };
    this.router.navigate(['/login'], extras);
   
      localStorage.clear();

    }
  }

