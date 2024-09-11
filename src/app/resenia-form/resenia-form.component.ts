import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MyauthService } from '../myauth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReseniaPost } from '../models/ReseniaPost.model';
@Component({
  selector: 'app-resenia-form',
  templateUrl: './resenia-form.component.html',
  styleUrl: './resenia-form.component.css'
})
export class ReseniaFormComponent {
  @Input() mangaId!: number;
  @Input() userId!: number;
  reseniaForm!: FormGroup;
  @Output() reseniaAgregada = new EventEmitter<void>();



  constructor(private fb: FormBuilder, private mangaService: MyauthService) { }
  ngOnInit(): void {
    this.reseniaForm = this.fb.group({
      Resenia: ['', Validators.required],
      Likes: [0, Validators.required],
      Dislike: [0, Validators.required],
      Usuario: [this.userId, Validators.required],
      Manga: [this.mangaId, Validators.required]
    });
  }


  onSubmit(): void {
    if (this.reseniaForm.valid) {
      this.mangaService.postResenia(this.reseniaForm.value).subscribe({
        next: response => {
          console.log('Reseña enviada correctamente', response);
          this.reseniaForm.reset({
            Resenia: '',
            Likes: 0,
            Dislike: 0,
            Usuario: this.userId,
            Manga: this.mangaId
          });
          this.reseniaAgregada.emit();
        },
        error: err => {
          console.error('Error al enviar la reseña', err);
        }
      });
    }
  }

}
