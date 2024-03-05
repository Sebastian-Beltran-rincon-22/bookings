import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourformComponent } from './tourform/tourform.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FormbookingComponent } from './formbooking/formbooking.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    TourformComponent,
    BookingsComponent,
    FormbookingComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
