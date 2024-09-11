import { Component, OnInit } from '@angular/core';
import { MyauthService } from '../myauth.service';
import { Router } from '@angular/router';
import { Manga } from '../models/manga.model';
import { NavComponent } from '../nav/nav.component'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  magas: Manga[] = [];
  mangas: any;
  constructor(private authService: MyauthService, private router: Router) { }
  volumes: Manga[] = [];

  ngOnInit(): void {
    this.authService.getMagas().subscribe(
      (data: any) => {
        this.volumes = data.$values; // Asigna data.$values al array volumes
      },
      error => {
        console.error('Error obteniendo los mangas:', error);
      }
    );
  }

  viewDetails(mangaId: number): void {
    this.router.navigate(['/manga', mangaId]);
  }


}
