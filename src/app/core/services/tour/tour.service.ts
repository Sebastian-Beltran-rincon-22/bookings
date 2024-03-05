import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Home } from 'src/app/models/item';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private baseURL = "http://127.0.0.1:5000/tours/";
  constructor( private http: HttpClient) {
    this.baseURL
  }

  getTourData(): Observable<Home>{
    const url = `${this.baseURL}toursdetails`;
    return this.http.get<Home>(url)
  }

  postTourData(formData: any, headers: any): Observable<Home> {
    const url = `${this.baseURL}newtour`;
    return this.http.post<Home>(url, formData, { headers });
  }

  updateTourData(id: number, updatedData: any): Observable<Home> {
    const url = `${this.baseURL}update/${id}`;
    return this.http.put<Home>(url, updatedData);
  }

  deleteTourData(id:number): Observable<Home> {
    const url = `${this.baseURL}delete/${id}`;
    return this.http.delete<Home>(url);
  }

  getTourById(tourId: number): Observable<any> {
    const url = `${this.baseURL}tourfor/${tourId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error in TourService:', error);
    return new Observable<never>(() => {
      throw error;
    });
  }
}

