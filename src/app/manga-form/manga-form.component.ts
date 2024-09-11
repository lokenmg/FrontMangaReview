import { Component } from '@angular/core';
import { MyauthService } from '../myauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrl: './manga-form.component.css'
})
export class MangaFormComponent {
  manga = {
    nombre: '',
    portada: '',
    tomo: '',
    estado: '',
    anioSalida: '',
    sinopsis: ''
  };
  constructor(private mangaService: MyauthService, private router: Router) { }
  onSubmit() {
    this.mangaService.addManga(this.manga).subscribe(
      response => {
        alert('Manga registrado con éxito');
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al registrar el manga', error);
      }
    );
  }
}
