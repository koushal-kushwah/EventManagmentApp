import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventFunctionComponent } from './event-function/event-function.component';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventsComponent } from './events/events.component';
import { FunctionScheduleComponent } from './function-schedule/function-schedule.component';
import { GuestComponent } from './guest/guest.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatefunctionlistComponent } from './updatefunctionlist/updatefunctionlist.component';
import { RouterModule } from '@angular/router';
import { UpdatdefunScheduleComponent } from './updatdefun-schedule/updatdefun-schedule.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchPipe } from './dashboard/search.pipe';
import { Location } from '@angular/common';
import { SearchSchedulePipe } from './function-schedule/search-schedule.pipe';
import { FooterComponent } from './footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SearchPipe,
    AppComponent,
    EventFunctionComponent,
    SidebarComponent,
    DashboardComponent,
    EventsComponent,
    FunctionScheduleComponent,
    GuestComponent,
    UpdateEventComponent,
    UpdatefunctionlistComponent,
    UpdatdefunScheduleComponent,
    NavbarComponent,
    SearchPipe,
    SearchSchedulePipe,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
