import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EventFunctionComponent } from '../event-function/event-function.component';
import { EventsComponent } from '../events/events.component';
import { FunctionScheduleComponent } from '../function-schedule/function-schedule.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      
      {
        path: 'eventfunction',
        component: EventFunctionComponent,
      },
      {
        path : 'events',
        component : EventsComponent
      },
      {
        path : `function`,
        component : FunctionScheduleComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarRoutingModule {}
