

// ################################ Main component file #################################################
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIfContext } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {
  events: any[] = [];
  newEvent: any = {};
  selectedEvent: any = {};
  isUpdateMode = false;
  eventpar: any;
  users: any;
  userName: any;
  userId: any;
  ds: any;
  user: any;
  searchText: string = '';

  displayedColumns: string[] = [
    'id',
    'user_id',
    'name',
    'description',
    'subtitle',
    'start_dt',
    'end_dt',
    'address',
    'action'
    // 'created_dt',
    // 'updated_dt',
   
    // 'longitude',
    // 'location_range',
    // 'contact_person',
    // 'contact_phone',
    // 'logo',
  ];


  savedEventId: number | undefined;
  noResults: TemplateRef<NgIfContext<boolean>> | null = null;


  dataSource:any=MatTableDataSource<any>;
  dataSourceWithPageSize:any= MatTableDataSource<any>;
  
  
  @ViewChild(MatPaginator)paginatorPageSize!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  readonly apiurl = 'http://localhost:3000/event/fetchall'
  readonly apiurlByid = 'http://localhost:3000/event/fetch'

  readonly apiurls = 'http://localhost:3000/event/save'
  readonly apiurlupdate = 'http://localhost:3000/event/update'
  readonly apiurldelete = 'http://localhost:3000/event/delete'


  ngOnInit(): void {
    
    this.dataSource = new MatTableDataSource();
    this.eventpar = this.route.snapshot.params['id'];
    console.log("eid" + this.eventpar);
  
    this.http.get<any[]>(`http://localhost:3000/user/fetch/${this.eventpar}`).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          const firstObject = response[0];
          this.userName = firstObject.name;
          this.ds = firstObject.description;
          console.log(this.userName);
        }
      });
  
    this.getdata(); // Call the method to load the data initially
  }
  

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  
  // loadEvents() {
  //   this.http.get(this.apiurl).subscribe((result: any) => {
  //     this.events = this.users;
  //     this.dataSource.data = result;
     
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("dataaaaa",this.paginator)
  //   });
  //   this.dataSource = new MatTableDataSource(this.users);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  addEvent() {
    const data2 = {
      "name": this.newEvent.name,
      "user_id": this.eventpar,
      "subtitle": this.newEvent.subtitle,
      "start_dt": this.newEvent.start_dt,
      "end_dt": this.newEvent.end_dt,
      "description": this.newEvent.description,
      "address": this.newEvent.address
    }

    const tokent = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${tokent}` // Assuming it's a Bearer token
       }); 

    this.http.post(this.apiurls, data2,{headers}).subscribe((result: any) => {
      this.savedEventId = result.id;
      console.log(this.users)
      window.location.reload();
      console.log(result.id)
    })
  }


getdata()
{
  const tokent = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': `${tokent}` // Assuming it's a Bearer token
     }); 

  this.http.get(this.apiurl,{headers}).subscribe((result: any) => {
    this.users = result;
    console.log(this.users)
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.data = this.users;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // // Pagination code
    // // this.dataSource = new MatTableDataSource(this.events);
    // // this.dataSource.paginator = this.paginator;
    // this.dataSource = new MatTableDataSource(this.users);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  
  })

}
  

  editEvent(events: any) {
    this.isUpdateMode = true;
    this.selectedEvent = { ...events };
    console.log(events)
  }

  deleteEvent(id: any): void {

    const tokent = localStorage.getItem('token');
  const headers = new HttpHeaders({
      'Authorization': `${tokent}` // Assuming it's a Bearer token
     }); 

    console.log(id);
    this.http.delete(`${this.apiurldelete}/${id}`,{headers}).subscribe(
    );
    window.location.reload();
  }


  pageSizes = [2, 4, 8];

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}
// ################################ Main component file #################################################




// #################################################################################


// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { NgIfContext } from '@angular/common';
// import { ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';


// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })



// export class DashboardComponent implements OnInit {
//   events: any[] = [];
//   newEvent: any = {};
//   selectedEvent: any = {};
//   isUpdateMode = false;
//   eventpar: any;
//   users: any;
//   userName: any;
//   userId: any;
//   ds: any;
//   user: any;
//   searchText: string = '';
//   dataSourceWithPageSize:any= MatTableDataSource<any>;

//   savedEventId: number | undefined;
//   noResults: TemplateRef<NgIfContext<boolean>> | null = null;


//   @ViewChild(MatPaginator)paginator!: MatPaginator;
//   @ViewChild(MatPaginator)paginatorPageSize!: MatPaginator;
//   @ViewChild(MatTable) table!: MatTable<any>; 
//   @ViewChild(MatSort) sort!: MatSort;

//   dataSource: MatTableDataSource<any>;

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   readonly apiurl = 'http://localhost:3000/event/fetchall'
//   readonly apiurlByid = 'http://localhost:3000/event/fetch'

//   readonly apiurls = 'http://localhost:3000/event/save'
//   readonly apiurlupdate = 'http://localhost:3000/event/update'
//   readonly apiurldelete = 'http://localhost:3000/event/delete'


//   ngOnInit(): void {
    
//     this.http.get(this.apiurl).subscribe((result: any) => {
//       this.users = result;
//       console.log(this.users)

//       // Pagination code
//       // this.dataSource = new MatTableDataSource(this.events);
//       // this.dataSource.paginator = this.paginator;
//     })
//     this.eventpar = this.route.snapshot.params['id'];
//     console.log("eid" + this.eventpar)

//     this.http.get<any[]>(`http://localhost:3000/user/fetch/${this.eventpar}`).subscribe(
//       (response: any[]) => {
//         if (response.length > 0) {
//           const firstObject = response[0];
//           this.userName = firstObject.name;
//           this.ds = firstObject.description
//           console.log(this.userName)
//         }
//       })
//   }

//   loadEvents() {
//     this.http.get(this.apiurl).subscribe((result: any) => {
//       this.events = this.users;
//     });
//   }

//   addEvent() {
//     const data2 = {
//       "name": this.newEvent.name,
//       "user_id": this.eventpar,
//       "subtitle": this.newEvent.subtitle,
//       "start_dt": this.newEvent.start_dt,
//       "end_dt": this.newEvent.end_dt,
//       "description": this.newEvent.description,
//       "address": this.newEvent.address

//     }

//     this.http.post(this.apiurls, data2).subscribe((result: any) => {
//       this.savedEventId = result.id;
//       console.log(this.users)
//       window.location.reload();
//       console.log(result.id)
//     })
//   }

  

//   editEvent(events: any) {
//     this.isUpdateMode = true;
//     this.selectedEvent = { ...events };
//     console.log(events)
//   }

//   deleteEvent(id: any): void {
//     console.log(id);
//     this.http.delete(`${this.apiurldelete}/${id}`).subscribe(
//     );
//     window.location.reload();
//   }


//   pageSizes = [3, 5, 7];

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }
// }
