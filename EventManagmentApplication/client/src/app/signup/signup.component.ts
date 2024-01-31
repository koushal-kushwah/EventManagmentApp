import { Component } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  name = '';
  email = '';
  phone = '';
  role = 'event_organizer'; 
  password = '';
  message: string = '';

  constructor(private signupService: SignupService) {}

  onSubmit(userData: any) {
    this.signupService.signup(userData).subscribe(
      (response: any) => {
        this.message = 'Signup successful';
        this.clearInputFields();
      },
      (error) => {
        this.message = 'Signup error. Please try again.';
        console.error('Signup error', error);
      }
    );
  }

  clearInputFields() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.role = 'event_organizer'; 
    this.password = '';
  }
}







// import { Component } from '@angular/core';
// import { SignupService } from './signup.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent {

//   name = '';
//   email = '';
//   phone = '';
//   role = '';
//   password = '';
//   message: string = '';

//   constructor(private signupService: SignupService) {}

//   onSubmit(userData: any) {
    
//     this.signupService.signup(userData).subscribe(
//       (response: any) => {
//         this.message = 'Signup successful'; 
//         this.clearInputFields();
//       },
//       (error) => {
//         this.message = 'Signup error. Please try again.'; 
//         console.error('Signup error', error);
//       }
//     );
//   }


//   clearInputFields() {
//     this.name = '';
//     this.email = '';
//     this.phone = '';
//     this.role = '';
//     this.password = '';
//   }

// }
