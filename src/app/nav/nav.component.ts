import { Component, OnInit} from '@angular/core';
import { MyauthService } from '../myauth.service';
import { Usuario } from '../models/usuario.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  currentUser!: Usuario;
  searchResults: any[] = [];

  constructor(private authService: MyauthService) { }

  ngOnInit(): void {
    const userJson = this.authService.currentUserValue;
    this.currentUser = this.transformUser(userJson);
  }
  onSearch(event: any): void {
    const query = event.target.value;
    if (query.length > 2) {
      this.authService.searchManga(query).subscribe({
        next: (data: any) => {
          this.searchResults = data.$values;
        },
        error: (error) => {
          console.error('Error buscando mangas:', error);
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  private transformUser(userJson: any): Usuario {
    return {
      email: userJson.email,
      idUsuario: userJson.idUsuarios,
      img: userJson.img
    };
  }
}
