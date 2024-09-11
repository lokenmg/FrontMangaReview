import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyauthService } from './myauth.service';
import { NavComponent } from './nav/nav.component';
import { ReseniasComponent } from './resenias/resenias.component';
import { ReseniaFormComponent } from './resenia-form/resenia-form.component';
import { MangaFormComponent } from './manga-form/manga-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    ReseniasComponent,
    ReseniaFormComponent,
    MangaFormComponent
  ],
  imports: [
    FormsModule, // Asegúrate de agregar FormsModule aquí
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [MyauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
