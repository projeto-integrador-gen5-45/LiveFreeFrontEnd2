import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

constructor(
   private http: HttpClient
    ) { }

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

getAllCategoria(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>('https://livefreebackend.herokuapp.com/categoria',this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`https://livefreebackend.herokuapp.com/categoria/${id}`, this.token)
  }  

postCategoria(categoria:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>('https://livefreebackend.herokuapp.com/categoria',categoria,this.token)
}

putCategoria(categoria:Categoria):Observable<Categoria>{
  return this.http.put<Categoria>('https://livefreebackend.herokuapp.com/categoria',categoria,this.token)
}

deleteCategoria(id: number) {
  return this.http.delete(`https://livefreebackend.herokuapp.com/categoria/${id}`, this.token)
}

}
