import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  providers: [DatePipe],
})

export class UpdateEventComponent implements OnInit {
  userId: any;
  userName: string = '';
  eventId: any;
  updateForm: FormGroup;
  subtitle: any;
  start_dt: any;
  end_dt: any;
  description: any;
  address: any;
  data:any;
  successMessage: string | null = null;
  errorMessage: string | null = null;



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location
  ) {
    // Initialize the form controls
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      event_id: new FormControl(''),
      subtitle: new FormControl(''),
      start_dt: new FormControl(''),
      end_dt: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl('')

      // Add other form controls as needed
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      console.log(this.userId)

      const tokent = localStorage.getItem('token');
        const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       }); 

      this.http.get<any[]>(`http://localhost:3000/event/fetch/${this.userId}`,{headers}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            const firstObject = response[0];
            this.userName = firstObject.name;
            this.eventId = firstObject.event_id
            this.subtitle = firstObject.subtitle
            this.start_dt = this.datePipe.transform(firstObject.start_dt, 'yyyy-MM-dd');
            this.end_dt = this.datePipe.transform(firstObject.end_dt, 'yyyy-MM-dd');
            this.description = firstObject.description
            this.address = firstObject.address


            // Initialize the form controls here
            this.updateForm.patchValue({
              name: this.userName,
              event_id: this.eventId,
              subtitle: this.subtitle,
              start_dt: this.start_dt,
              end_dt: this.end_dt,
              description: this.description,
              address: this.address
              // Update other form controls as needed
            });
          } else {
            console.error('The response is empty or not an array.');
          }
        },
        (error) => {
          console.error("Error:", error);
          // Handle the error here
        }
      );
    });
  }


  goBack(): void {
    this.location.back();
  }


  onFormSubmit(updateForm: FormGroup): void {
    const name = updateForm.value.name;
    const event_id = updateForm.value.event_id;
    const subtitle = updateForm.value.subtitle;
    const start_dt = updateForm.value.start_dt;
    const end_dt = updateForm.value.end_dt;
    const description = updateForm.value.description;
    const address = updateForm.value.address;




    const data = {
      id: this.userId,
      name,
      event_id,
      subtitle,
      start_dt,
      end_dt,
      description,
      address
    };

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       }); 

    console.log(data)
    this.http.put(`http://localhost:3000/event/update/${this.userId}`,data,{headers}).subscribe(
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