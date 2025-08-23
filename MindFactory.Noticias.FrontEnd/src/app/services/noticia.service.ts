import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedResult } from '../core/models/paged-result';
import { NoticiaDto } from '../models/noticias/noticia-dto';
import { NoticiaSearchFilter } from '../models/noticias/noticia-search-filter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = `${environment.apiUrl}/noticias`; // Cambiá por tu URL real

  constructor(private http: HttpClient) {}

  getAll(pageIndex: number = 1, pageSize: number = 10): Observable<PagedResult<NoticiaDto>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    return this.http.get<PagedResult<NoticiaDto>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<NoticiaDto | null> {
   console.log("prueba 1 ");
    return this.http.get<NoticiaDto>(`${this.apiUrl}/${id}`).pipe(
      map(noticia => noticia ?? null)
    );
  }

  search(filter: NoticiaSearchFilter): Observable<PagedResult<NoticiaDto>> {
    let params = new HttpParams();
    if (filter.pageIndex) params = params.set('pageIndex', filter.pageIndex);
    if (filter.pageSize) params = params.set('pageSize', filter.pageSize);
    if (filter.titulo) params = params.set('titulo', filter.titulo);
    if (filter.contenido) params = params.set('contenido', filter.contenido);
    if (filter.resumen) params = params.set('resumen', filter.resumen);
    if (filter.categoriaId) params = params.set('categoriaId', filter.categoriaId);

    return this.http.get<PagedResult<NoticiaDto>>(`${this.apiUrl}/search`, { params });
  }

  create(noticia: NoticiaDto): Observable<NoticiaDto> {
    return this.http.post<NoticiaDto>(this.apiUrl, noticia);
  }

  update(id: number, noticia: NoticiaDto): Observable<NoticiaDto> {
    return this.http.put<NoticiaDto>(`${this.apiUrl}/${id}`, noticia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
