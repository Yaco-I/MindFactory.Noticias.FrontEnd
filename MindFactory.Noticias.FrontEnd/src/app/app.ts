import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer-component/footer-component';
import { HeaderComponent } from './shared/header-component/header-component';
import { NotificacionComponent } from './shared/components/notificacion/notificacion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    NotificacionComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('MindFactory.Noticias.FrontEnd');
}
