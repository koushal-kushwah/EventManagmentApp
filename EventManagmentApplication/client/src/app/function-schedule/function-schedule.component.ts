

import { Component, OnInit } from '@angular/core';
import { FunctionScheduleService } from './function-schedule.service';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchSchedulePipe } from './search-schedule.pipe';

@Component({
  selector: 'app-function-schedule',
  templateUrl: './function-schedule.component.html',
  styleUrls: ['./function-schedule.component.css'],
})
export class FunctionScheduleComponent implements OnInit {
  functionSchedules: any[] = [];
  isUpdateMode: boolean = false;
  selectedFunctionSchedule: any = {};
  newFunctionSchedule: any = {};
  eventFunctions : any [] = [];
  event_id : any;
  function_id: any;
  searchText: string = '';

  constructor(private functionScheduleService: FunctionScheduleService,
     private router : Router, private  route: ActivatedRoute,
     private location: Location
     ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.function_id = params.get('id');
   console.log(this.function_id)

     this.event_id=params.get('eid')
   console.log(this.event_id)
      this.loadFunctionSchedules();
      console.log(this.eventFunctions)


  //   this.route.paramMap.subscribe(params => {
  //     // Access route parameters from the paramMap observable
  // this.event_id = params.get('id');
  

  //     // Use the parameters as needed
  //     console.log('param1:', this.event_id );
  //     this.loadEventFunctions();
    
    });
 
    this.loadFunctionSchedules();
  }

  loadFunctionSchedules(): void {
    this.functionScheduleService.fetchAllFunctionSchedules().subscribe(
      (data: any = []) => {
        this.functionSchedules = data;
      });
  }

  addFunctionSchedule(): void {

    const data2 = {
      "event_id": this.event_id,
      "title": this.newFunctionSchedule.title,
      "function_id":this.function_id
    }
    console.log(data2)

    this.functionScheduleService.addFunctionSchedule(data2).subscribe((data) => {
      this.loadFunctionSchedules();
      this.newFunctionSchedule = {};
    });
  }


  goBack(): void {
    this.location.back();
  }


  deleteFunctionSchedule(id: number): void {
    this.functionScheduleService.deleteFunctionSchedule(id).subscribe((data) => {
      this.loadFunctionSchedules();
    });
  }
}

