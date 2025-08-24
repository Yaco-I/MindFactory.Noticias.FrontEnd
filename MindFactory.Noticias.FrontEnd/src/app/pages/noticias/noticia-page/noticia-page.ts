import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaDto } from '../../../models/noticias/noticia-dto';
import { NoticiasCarruselComponent } from '../../../shared/components/noticias-carrusel/noticias-carrusel';
import { NoticiaService } from '../../../services/noticia.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-noticia-page',
  standalone: true,
  imports: [CommonModule, NoticiasCarruselComponent],
  templateUrl: './noticia-page.html',
  styleUrls: ['./noticia-page.css']
})
export class NoticiaPageComponent implements OnInit{
  noticiaActual: NoticiaDto | undefined;
  noticiasRelacionadas: NoticiaDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticiaService: NoticiaService,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));

    if (!id) {
      this.router.navigate(['/noticias']);
      return;
    }

    this.cargarNoticia(id);
  });
  }
  
 cargarNoticia(id:number): void {
  this.noticiaService.getById(id).subscribe({
    next: (data : NoticiaDto | null ) => {
      if (!data) {
        this.router.navigate(['/noticias']);
      } else {
        this.noticiaActual = data;
        this.cargarNoticiasRelacionadas(this.noticiaActual.categoriaId, this.noticiaActual.id);

      }
    },
    error: () => this.router.navigate(['/noticias'])
  });
}

 private cargarNoticiasRelacionadas(categoria: number, idExcluir: number): void {
  this.noticiaService.search({ categoriaId: categoria, pageIndex:1, pageSize:10}).subscribe({
      next: (data) => {
        this.noticiasRelacionadas = data.items;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar noticias relacionadas:', err);
      }
    });
  }

  changeNoticia (id:number): void{
    this.cargarNoticia(id);
  }
  
}

