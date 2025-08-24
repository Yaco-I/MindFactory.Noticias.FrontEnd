import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaDto } from '../../../models/noticias/noticia-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias-carrusel.html',
  styleUrls: ['./noticias-carrusel.css']
})
export class NoticiasCarruselComponent {
  @Input() noticias: NoticiaDto[] = [];
  @Input() display: boolean = true;
  constructor(private router: Router) {}

  irANoticia(noticia: NoticiaDto) {
    this.router.navigate([`/noticias/${noticia.id}`]);
  }
}