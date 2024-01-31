import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-updatdefun-schedule',
  templateUrl: './updatdefun-schedule.component.html',
  styleUrls: ['./updatdefun-schedule.component.css']
})
export class UpdatdefunScheduleComponent implements OnInit{

  updateForm: FormGroup;
  id:any;
  title : any;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private location: Location
    )
  {
    this.updateForm = new FormGroup({
      title: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
     
      this.id = +params['id'];
      // this.id = this.userId;
      console.log(`====>`+this.id);

      const tokent = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': `${tokent}` // Assuming it's a Bearer token
         });

      this.http.get<any[]>(`http://localhost:3000/function/fetch/${this.id}`,{headers}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            const firstObject = response[0];
            this.title = firstObject.title;
            // this.eventId=firstObject.event_id
            // Initialize the form controls here
            this.updateForm.patchValue({
              title: this.title,
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
  const title = updateForm.value.title;
 

    const data = {
      title,
    };
    
console.log(data)

const tokent = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': `${tokent}` // Assuming it's a Bearer token
         });

  this.http.put(`http://localhost:3000/function/update/${this.id}`, data, {headers}).subscribe(
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
  
