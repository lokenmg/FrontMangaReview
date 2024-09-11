import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyauthService } from '../myauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: MyauthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.router.navigate(['/home']); // Redirige al usuario después de un inicio de sesión exitoso
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}




