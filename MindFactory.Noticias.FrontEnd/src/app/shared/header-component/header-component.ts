import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NoticiaDto } from '../../models/noticias/noticia-dto';
import { NoticiaService } from '../../services/noticia.service';
import { NotificacionService } from '../../services/notificacion.service';
import { CommonModule } from '@angular/common';
import { NoticiaFormPopupComponent } from '../components/noticia-form-popup/noticia-form-popup';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NoticiaFormPopupComponent],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showButton = false;
  isEditMode = false;
  showPopup = false;
  noticiaParaEditar: NoticiaDto | null = null;
  noticiaId: number | null = null;

  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noticiaService: NoticiaService,
    private notificacionService: NotificacionService,
    private cdr: ChangeDetectorRef
  ) {
    this.routerSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;

      const partes = currentRoute.split('/');
      this.noticiaId = partes.length > 2 ? +partes[2] : null;

      this.isEditMode = !!this.noticiaId;
      
      
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  abrirPopup(): void {
    if (this.isEditMode) {
      if (this.noticiaId) {
        this.noticiaService.getById(this.noticiaId).subscribe(noticia => {
          this.noticiaParaEditar = noticia;
          this.showPopup = true;
          this.cdr.detectChanges();
        });
      }
    } else {
      this.noticiaParaEditar = null;
      this.showPopup = true;
    }
  }

  cerrarPopup(): void {
    this.showPopup = false;
    this.noticiaParaEditar = null;
  }

  onSaveSuccess(noticia: NoticiaDto): void {
    this.notificacionService.success(`Noticia "${noticia.titulo}" guardada con éxito.`);
    this.router.navigate(['/noticias']);
  }

  irNoticias(){
   this.router.navigate(['/noticias']);
  }

  eliminarNoticia(){
    if(this.noticiaId){
      this.noticiaService.delete(this.noticiaId).subscribe({
      next: () => {
        console.log("me eliminaron");
        this.notificacionService.success("Se elimino con exito la noticia");
        this.router.navigate(['/noticias']);
      },
      error: (error) => {
        this.notificacionService.error(error.error.Message);
      }
    });

    }
  }

}
