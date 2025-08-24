import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notificacion, NotificacionService } from '../../../services/notificacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit, OnDestroy {
  notificacion: Notificacion | null = null;
  private subscription: Subscription;

  constructor(private notificacionService: NotificacionService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.notificacionService.onAlert()
      .subscribe(notificacion => {
        if (notificacion?.message) {
          this.notificacion = notificacion;
          setTimeout(() => this.clearAlert(), 5000); // Auto-cierra después de 5 segundos
        } else {
          this.notificacion = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearAlert(): void {
    this.notificacion = null;
  }
}
