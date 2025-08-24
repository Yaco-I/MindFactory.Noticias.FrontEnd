import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Notificacion {
  id?: string;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private subject = new Subject<Notificacion>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<Notificacion> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, alertId = this.defaultId) {
    this.subject.next({ id: alertId, type: 'success', message });
  }

  error(message: string, alertId = this.defaultId) {
    this.subject.next({ id: alertId, type: 'error', message });
  }

  clear(id = this.defaultId) {
    this.subject.next({ id: id, message: '', type: 'success' });
  }
}
