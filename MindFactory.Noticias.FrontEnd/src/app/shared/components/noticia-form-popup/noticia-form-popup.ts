import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriaDto } from '../../../models/categorias/categoria-dto';
import { NoticiaDto } from '../../../models/noticias/noticia-dto';
import { CategoriaService } from '../../../services/categoria.service';
import { NoticiaService } from '../../../services/noticia.service';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-noticia-form-popup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './noticia-form-popup.html',
  styleUrls: ['./noticia-form-popup.css']
})
export class NoticiaFormPopupComponent implements OnInit {
  @Input() noticia: NoticiaDto | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saveSuccess = new EventEmitter<NoticiaDto>();

  noticiaForm: FormGroup;
  categorias: CategoriaDto[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private noticiaService: NoticiaService,
    private categoriaService: CategoriaService,
    private notificacionService: NotificacionService
  ) {
    this.noticiaForm = this.fb.group({
      id: [0],
      titulo: ['', Validators.required],
      url: ['', Validators.required],
      contenido: ['', Validators.required],
      resumen: [''],
      categoriaId: [null, Validators.required],
      publicada: [true]
    });

     }

  ngOnInit(): void {
    console.log('hola');
    this.cargarNoticias(); 
  }
  
  
  cargarNoticias(){
    this.categoriaService.getAll().subscribe({
        next: (data: CategoriaDto[]) => {
          this.categorias = data;
           if (this.noticia) {
              this.noticiaForm.patchValue(this.noticia);
            }
        },
        error: (err) => {
          this.notificacionService.error('Error al cargar categorías', err);
        }
      });

  }

  guardar(): void {
    if (this.noticiaForm.invalid) {
      this.noticiaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const noticiaData = this.noticiaForm.value as NoticiaDto;

    const saveObservable = noticiaData.id
      ? this.noticiaService.update(noticiaData.id, noticiaData)
      : this.noticiaService.create(noticiaData);

    saveObservable.subscribe({
      next: (savedNoticia) => {
        this.isLoading = false;
        this.saveSuccess.emit(savedNoticia);
        this.close.emit();
      },
      error: (error) => {
        console.log(error.error.Message);
        console.log('puto');
        
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un error al guardar la noticia. Por favor, inténtelo de nuevo.';
        this.notificacionService.error(error.error.Message);
      }
    });
    this.isLoading = false;
  }

  cerrar(): void {
    this.close.emit();
  }
}
