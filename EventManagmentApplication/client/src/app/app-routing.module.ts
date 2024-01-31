import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventFunctionComponent } from './event-function/event-function.component';
import { EventsComponent } from './events/events.component';
import { FunctionScheduleComponent } from './function-schedule/function-schedule.component';
import { GuestComponent } from './guest/guest.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdatefunctionlistComponent } from './updatefunctionlist/updatefunctionlist.component';
import { UpdatdefunScheduleComponent } from './updatdefun-schedule/updatdefun-schedule.component';



const routes: Routes = [
  {
    path: 'eventfunction/:id',
    component: EventFunctionComponent,
  },
      {
        path: 'events/:id',
        component: EventsComponent
      },
  {
    path: 'updatefun/:id',
    component: UpdatefunctionlistComponent,
  },
  {
    path: 'updatefunSchedule/:id',
    component: UpdatdefunScheduleComponent,
  },
  {
    path: `functionSchedule/:id/:eid`,
    component: FunctionScheduleComponent
  },
  
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'update/:id',
    component: UpdateEventComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    children: [
      {
        path: 'eventfunction/:id',
        component: EventFunctionComponent,
      },
      // {
      //   path: 'events',
      //   component: EventsComponent
      // },
      {
        path: `functionSchedule`,
        component: FunctionScheduleComponent
      },
      {
        path: 'guest',
        component: GuestComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// const routes: Routes = [
//   {
//     path: 'eventfunction/:id',
//     component: EventFunctionComponent,
//   },
//   // {
//   //   path: `function/:id/:eid`,
//   //   component: FunctionScheduleComponent
//   // },


//   {
//     path: ``, redirectTo: `login`, pathMatch: `full`
//   },
//   {
//     path: `login`,
//     component: LoginComponent,

//   },
//   {
//     path: `update/:id`,
//     component: UpdateEventComponent,

//   },
//   {
//     path: `updatefun/:id`,
//     component: UpdatefunctionlistComponent,

//   },

//   {
//     path: `signup`,
//     component: SignupComponent
//   },
//   {
//     path: `dashboard/:id`,
//     component: DashboardComponent,
//     children: [
//       {
//         path: 'eventfunction',
//         component: EventFunctionComponent,
//       },
//       // {
//       //   path: `updatefunctionlist/:id`,
//       //   component: UpdatefunctionlistComponent,

//       // },
//       {
//         path: 'events',
//         component: EventsComponent
//       },
//       // {
//       //   path: `function`,
//       //   component: FunctionScheduleComponent
//       // },
//       {
//         path : `guest`,
//         component : GuestComponent
//       }
//     ]
//   },

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }
