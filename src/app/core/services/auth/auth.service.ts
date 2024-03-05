import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Home } from 'src/app/models/item';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = "http://127.0.0.1:5000/";
  constructor( private http: HttpClient, private router: Router) {
    this.baseURL
  }

  getToken() {
    return localStorage.getItem('token')
  }

    // Metodo para obtener el Id del usuario logeado desde el token almacenado
    getLoggedInUserId(): number {
      const token = this.getToken();

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.id) {
          return payload.id;
        }
      }
      throw new Error("no se obtuvo el Id");

    }

  public signUp(user: any): Observable<any> {
    const url = `${this.baseURL}new`;
    return this.http.post<any>(url, user)
  }

    public signIn(user: any): Observable<any> {
      const url = `${this.baseURL}login`;
      return this.http.post<any>(url, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
