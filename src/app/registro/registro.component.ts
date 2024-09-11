import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyauthService } from '../myauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: MyauthService, private router: Router) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      img: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.usuarioService.register(this.registroForm.value).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente', response);
          this.router.navigate(['/login']);
          this.registroForm.reset();
        },
        error: (error) => {
          console.error('Error registrando usuario', error);
        }
      });
    }
  }
}
