import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  eventpar: any;
  user_id: any;
  email = '';
  password = '';
  error: string = '';
  users: any;
  userId = 0;
  userName: any;
  readonly apiurl = "http://localhost:3000/user/fetchall";
  readonly apiurlogin = "http://localhost:3000/user/login";

  constructor(private loginService: LoginService, private authService : AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.apiurl).subscribe((result: any) => {
      this.users = result;
      console.log(this.users)
    })
    // this.eventpar = this.route.snapshot.params['id'];
    // console.log("eid" + this.eventpar)
  }



  onSubmit(formValue: any) {


    this.http.post(this.apiurlogin, { email: this.email, password: this.password }).subscribe(
      (response: any) => {
        // const token = response.token; // Adjust this based on your server response
        // this.authService.setToken(token);
        const token = response.token;
        this.authService.setToken(token);
        const headers = this.authService.getToken();
        // Redirect to the dashboard or perform other actions
      },
      (error) => {
        this.error = 'Invalid email or password'; // Handle login errors
      }
    );




    this.http.get(this.apiurl).subscribe((result) => {
      this.users = result
      if (this.users) {
        for (let i = 0; i < this.users.length; i++) {
          console.log(this.users.email)
          if (this.users[i].email === formValue.email) {

            this.user_id = this.users[i].id;  
            console.log(this.user_id);
            this.router.navigateByUrl(`/dashboard/${this.user_id}`);
          }
        }
      }
    })
  }
}

