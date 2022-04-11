import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from '../model/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllServicos(): Observable<Servico[]>{
    return this.http.get<Servico[]>('https://livefreebackend.herokuapp.com/servicos', this.token)
  }

  getByIdServico(id: number): Observable<Servico>{
    return this.http.get<Servico>(`https://livefreebackend.herokuapp.com/servicos/${id}`, this.token)
  }

  getByTituloServico(titulo:string): Observable<Servico[]>{
    return this.http.get<Servico[]>(`https://livefreebackend.herokuapp.com/servicos/titulo/${titulo}`, this.token)
  }

  postServico(servico: Servico) : Observable<Servico>{
    return this.http.post<Servico>('https://livefreebackend.herokuapp.com/servicos', servico, this.token)
  }

  putServico(servico: Servico): Observable<Servico>{
    return this.http.put<Servico>('https://livefreebackend.herokuapp.com/servicos', servico, this.token)
  }

  deleteServico(id: number){
    return this.http.delete(`https://livefreebackend.herokuapp.com/servicos/${id}`, this.token)
  }

}
