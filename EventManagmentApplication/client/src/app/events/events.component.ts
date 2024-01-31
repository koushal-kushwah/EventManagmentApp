
import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  newEvent: any = {};
  selectedEvent: any = {};
  isUpdateMode = false;
  readonly apiurldelete='http://localhost:3000/event/delete/:id'


  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  addEvent() {
    this.eventsService.createEvent(this.newEvent).subscribe(() => {
      this.newEvent = {};
      this.loadEvents();
    });
  }

  updateEvent() {
    this.eventsService.updateEvent(this.selectedEvent).subscribe(() => {
      this.selectedEvent = {};
      this.isUpdateMode = false;
      this.loadEvents();
    });
  }

  editEvent(event: any) {
    this.isUpdateMode = true;
    this.selectedEvent = { ...event };
  }

  // deleteEvent(event: any) {
  //   this.eventsService.deleteEvent(event).subscribe(() => {
  //     this.loadEvents();
  //   });
  // }
  deleteEvent(event: any) {
    
  }
}












// import { Component, OnInit } from '@angular/core';
// import { EventsService } from './events.service';

// @Component({
//   selector: 'app-events',
//   templateUrl: './events.component.html',
//   styleUrls: ['./events.component.css']
// })
// export class EventsComponent implements OnInit {
//   events: any[] = [];
//   isUpdateMode: boolean = false;
//   selectedEvent: any = {};
//   newEvent: any = {};

//   constructor(private eventsService: EventsService) { }

//   ngOnInit(): void {
//     this.loadEvents();
//   }

//   loadEvents(): void {
//     this.eventsService.fetchAllEvents().subscribe((data) => {
//       this.events = data;
//     });
//   }

//   addEventData(): void {
//     this.eventsService.addEvent(this.newEvent).subscribe((data) => {
//       this.loadEvents();
//       this.newEvent = {}; 
//     });
//   }

//   updateEvent(): void {
//     this.eventsService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe((data) => {
     
//       this.loadEvents(); 
//       this.isUpdateMode = false; 
//       this.selectedEvent = {}; 
//     });
//   }

//   editEvent(event: any): void {
//     this.isUpdateMode = true;
//     this.selectedEvent = { ...event };
//   }

//   deleteEvent(eventId: number): void {
//     this.eventsService.deleteEvent(eventId).subscribe((data) => {
//       this.loadEvents();
//     });
//   }
// }
