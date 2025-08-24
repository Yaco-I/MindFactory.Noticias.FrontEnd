import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriaDto } from '../models/categorias/categoria-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  

   private apiUrl = `${environment.apiUrl}/categorias`; 

  constructor(private http: HttpClient) {}

  getAll(pageIndex: number = 1, pageSize: number = 10): Observable<CategoriaDto[]> {
    return this.http.get<CategoriaDto[]>(this.apiUrl);
  }


}
