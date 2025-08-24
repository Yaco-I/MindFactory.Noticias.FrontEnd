import { ChangeDetectorRef, Component } from '@angular/core';
import { NoticiaDto } from '../../../models/noticias/noticia-dto';
import { NoticiaService } from '../../../services/noticia.service';
import { Router } from '@angular/router';
import { PagedResult } from '../../../core/models/paged-result';
import { CommonModule } from '@angular/common';
import { NoticiasCarruselComponent } from '../../../shared/components/noticias-carrusel/noticias-carrusel';

@Component({
  selector: 'app-noticias-page',
  imports: [CommonModule, NoticiasCarruselComponent],
  templateUrl: './noticias-page.html',
  styleUrl: './noticias-page.css'
})
export class NoticiasPage {
  noticias: NoticiaDto[] = [];
  
    constructor(
      private router: Router,
      private noticiaService: NoticiaService,
       private cdr: ChangeDetectorRef
    ) {}
  
    ngOnInit(): void {
      this.cargarNoticia();
    }
    
   cargarNoticia(): void {
    this.noticiaService.getAll(1,10).subscribe({
      next: (data : PagedResult<NoticiaDto> | null ) => {
          this.noticias = data?.items ?? [];
          console.log(this.noticias);
          this.cdr.detectChanges();
          
      },
      error: () => this.router.navigate(['/noticias'])
    });
  }
  
irANoticia(id:number){
  console.log('hola');
  this.router.navigate([`noticias`, id]);
}
  
}
