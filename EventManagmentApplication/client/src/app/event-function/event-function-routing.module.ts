import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EventFunctionDetailsComponent } from '../eventfunctiondetails/eventfunctiondetails.component';

const routes: Routes = [

  // { path: 'dashboard/eventfunctionDetails/:id', component: EventFunctionDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventFunctionRoutingModule { }
