import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyauthService } from '../myauth.service';
import { Resenia } from '../models/resenia';
import { Usuario } from '../models/usuario.model';
import { Genero } from '../models/Genero.Model';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.component.html',
  styleUrls: ['./resenias.component.css']
})
export class ReseniasComponent implements OnInit {
  currentUser!: Usuario;
  mangaId: any;
  manga: any;
  resenias: Resenia[] = [];
  generos: Genero[] = [];

  constructor(private route: ActivatedRoute, private mangaService: MyauthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mangaId = params.get('id');
      if (this.mangaId) {
        this.loadMangaData(this.mangaId);
      }
    });

    const userJson = this.mangaService.currentUserValue;
    this.currentUser = this.transformUser(userJson);
  }

  private loadMangaData(mangaId: string): void {
    this.mangaService.getMangaInfo(parseInt(mangaId)).subscribe((data: any) => {
      this.manga = data;
    });

    this.mangaService.getReseniasByMangaId(mangaId).subscribe((data: Resenia[]) => {
      this.resenias = data;
    });

    this.mangaService.getGenerosPorMangaId(this.mangaId).subscribe({
      next: (data: Genero[]) => {
        this.generos = data;
      },
      error: (error) => {
        console.error('Error obteniendo géneros:', error);
      }
    });
  }

  private transformUser(userJson: any): Usuario {
    return {
      email: userJson.email,
      idUsuario: userJson.idUsuarios,
      img: userJson.img
    };
  }

  onReseniaAgregada(): void {
    if (this.mangaId) {
      this.loadMangaData(this.mangaId);
    }
  }
}
