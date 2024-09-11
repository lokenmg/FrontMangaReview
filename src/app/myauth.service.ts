import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Manga } from './models/manga.model'; 
import { Resenia } from './models/resenia';
import { map } from 'rxjs/operators';
import { ReseniaPost } from './models/ReseniaPost.model';
import { Genero } from './models/Genero.Model';
import { Registro } from './models/Registro.model';

@Injectable({
  providedIn: 'root'
})
export class MyauthService {
  private apiUrl = 'http://localhost:5064/api/Usuarios/login'; // Reemplaza con tu URL de la API
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials)
      .pipe(tap(user => {
        // Guarda los detalles del usuario y el token JWT en el localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  logout() {
    // Elimina al usuario del localStorage para cerrar la sesión
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getMagas(): Observable<Manga[]> {
    console.log(this.http.get<any>('http://localhost:5064/api/Manga'));
    return this.http.get<Manga[]>('http://localhost:5064/api/Manga');
  }

  getMangaInfo(id: number): Observable<Manga> {
    return this.http.get<Manga>(`http://localhost:5064/api/Manga/info/${id}`);
  }

  getReseniasByMangaId(id: number | string): Observable<Resenia[]> {
    return this.http.get<any>(`http://localhost:5064/api/Manga/${id}/resenias`).pipe(
      map(response => response.$values) // Extraer la lista de reseñas
    );
  }

  postResenia(resenia: ReseniaPost): Observable<any> {
    return this.http.post<any>(`http://localhost:5064/api/resenia`, resenia);
  }

  getGenerosPorMangaId(mangaId: number): Observable<Genero[]> {
    const url = `http://localhost:5064/api/Manga/${mangaId}/generos`;
    return this.http.get<any>(url).pipe(
      map(response => response.$values)
    );
  }

  searchManga(nombre: string): Observable<any> {
    return this.http.get(`http://localhost:5064/api/Manga/search?nombre=${nombre}`);
  }
  register(usuario: Registro): Observable<Registro> {
    return this.http.post<Registro>(`http://localhost:5064/api/Usuarios`, usuario);
  }

  addManga(manga: any): Observable<any> {
    // Setting likes and dislikes to 0
    manga.likes = 0;
    manga.dislikes = 0;
    return this.http.post(`http://localhost:5064/api/Manga`, manga);
  }
}
