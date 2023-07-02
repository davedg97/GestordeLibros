import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libros.interface';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${ this.baseUrl }/libros`);
  }

  getLibrosPorTitulo(titulo: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/libros?title_like=${titulo}`);
  }
  

  getLibrosPorTituloYMasFiltros( titulo: string, genero: string , fechaPublicacionInicio: Date[],fechaPublicacionFin: Date[] ):Observable<Libro[]> {
    let url = `${ this.baseUrl }/libros?title_like=${ titulo }`;
    if (genero !== '') {
      url += `&genre=${ genero }`;
    }
    return this.http.get<Libro[]>(url);
  }
 
  crearLibro( libro: Libro ): Observable<Libro> {
    return this.http.post<Libro>(`${ this.baseUrl }/libros`, libro );
  }

  actualizarLibro( libro: Libro ): Observable<Libro> {
    return this.http.put<Libro>(`${ this.baseUrl }/libros/${ libro.id }`, libro );
  }

  borrarLibro( id: number ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/libros/${ id }`);
  }
}
