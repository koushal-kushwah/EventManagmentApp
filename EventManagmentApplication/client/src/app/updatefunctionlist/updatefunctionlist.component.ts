import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-updatefunctionlist',
  templateUrl: './updatefunctionlist.component.html',
  styleUrls: ['./updatefunctionlist.component.css']
})
export class UpdatefunctionlistComponent  implements OnInit{
  userId:any;
  event_id:any;
  updateForm: FormGroup;
  name:any;
  description:any;
  icon:any;
  id:any;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    // Initialize the form controls
    this.updateForm = new FormGroup({
      name: new FormControl(''),
     description:new FormControl(''),
     icon:new FormControl('')
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     
      this.userId = +params['id'];
      this.id = this.userId;
      // console.log(this.id);

      const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       });

      this.http.get<any[]>(`http://localhost:3000/efunction/fetch/${this.userId}`,{headers}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            const firstObject = response[0];
            this.name = firstObject.name;
            this.description = firstObject.description;
            this.icon = firstObject.icon;

            // this.eventId=firstObject.event_id
            // Initialize the form controls here
            this.updateForm.patchValue({
              name: this.name,
              description:this.description,
              icon:this.icon
              // Update other form controls as needed
            });
          } else {
            console.error('The response is empty or not an array.');
          }
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    });
  }
 
  goBack(): void {
    this.location.back();
  }

  onFormSubmit(updateForm: FormGroup): void {
    const name = updateForm.value.name;
    const description =updateForm.value.description;
    const icon =updateForm.value.icon;
    console.log(name,description,icon)

      const data = {
        name,
        description,
        icon
      };
      
      console.log(this.id)

      const tokent = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': `${tokent}` // Assuming it's a Bearer token
         });

    this.http.put(`http://localhost:3000/efunction/update/${this.id}`, data,{headers}).subscribe(
      (result: any) => {
        this.successMessage = 'Data updated successfully'; // Set success message
        this.errorMessage = null; // Clear error message
        console.log(result);
      },
   

      (error) => {
        this.errorMessage = 'Error updating data: ' + error.message; // Set error message
        this.successMessage = null; // Clear success message
        console.error("Error:", error);
      }
   );
   
  }
 
}