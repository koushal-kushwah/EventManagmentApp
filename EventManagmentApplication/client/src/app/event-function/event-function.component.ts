import { Component, OnInit } from '@angular/core';
import { EventFunctionService } from './event-function.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-function',
  templateUrl: './event-function.component.html',
  styleUrls: ['./event-function.component.css'],
})
export class EventFunctionComponent implements OnInit {
  eventFunctions: any[] = [];
  isUpdateMode: boolean = false;
  selectedEventFunction: any = {};
  newEventFunction: any = {};
  event_id: any;
  searchText: string = '';

  constructor(private eventFunctionService: EventFunctionService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.event_id = params.get('id');
      this.loadEventFunctions();
      console.log(this.eventFunctions)
    });
  }


  loadEventFunctions(): void {
    this.eventFunctionService.getEventFunctions().subscribe((data) => {
      this.eventFunctions = data;
      console.log(this.eventFunctions)
    });
  }

  goBack(): void {
    this.location.back();
  }



  addEventFunction(): void {
    const data2 = {
      "name": this.newEventFunction.name,
      "event_id": this.event_id,
      "description": this.newEventFunction.description,
      "icon": this.newEventFunction.icon
    }

    

    if (!data2.description || data2.description.trim() === '') {
      data2.description = null;
    }
    if (!data2.icon || data2.icon.trim() === '') {
      data2.icon = null;
    }

    this.eventFunctionService.addEventFunction(data2).subscribe((data) => {

      this.newEventFunction = {};
      this.loadEventFunctions();

      console.log(data2)
      window.location.reload();
    });
  }


  deleteEventFunction(eventFunctionId: number): void {
    this.eventFunctionService.deleteEventFunction(eventFunctionId).subscribe((data) => {
      this.loadEventFunctions();
    });
  }
}


