import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, HomeBookings } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseURL = "http://127.0.0.1:5000/bookings/";
  constructor( private http: HttpClient) {
    this.baseURL
  }

  getBookings(): Observable<HomeBookings>{
    const url = `${this.baseURL}completebooking`;
    return this.http.get<HomeBookings>(url)
  }

  postBooging(formData: any,): Observable<HomeBookings> {
    const url = `${this.baseURL}newbooking`;
    return this.http.post<HomeBookings>(url, formData);
  }


  deleteBooking(id:number): Observable<HomeBookings> {
    const url = `${this.baseURL}deletebooking/${id}`;
    return this.http.delete<HomeBookings>(url);
  }

}
