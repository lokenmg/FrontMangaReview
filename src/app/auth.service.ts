import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5064/api/Usuarios/login'; // URL del endpoint de autenticación

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, contraseña: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
