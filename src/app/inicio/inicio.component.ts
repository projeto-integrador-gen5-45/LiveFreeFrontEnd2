import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Categoria } from './../model/Categoria';
import { CategoriaService } from './../service/categoria.service';
import { ServicoService } from './../service/servico.service';
import { Servico } from '../model/Servico';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  servico: Servico = new Servico()
  listaServicos: Servico[]

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private servicoService: ServicoService,
    private categoriaService: CategoriaService,
    private auth: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.auth.refreshToken();
    this.getAllCategorias();
    this.getAllServicos();
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) =>{
      this.categoria = resp
    })
  }

  getAllServicos(){
    this.servicoService.getAllServicos().subscribe((resp: Servico[]) => {
      this.listaServicos = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  publicar(){
    this.categoria.id = this.idCategoria
    this.servico.categoria = this.categoria

    this.user.id = this.idUser
    this.servico.usuario = this.user

    this.servicoService.postServico(this.servico).subscribe((resp: Servico) => {
      this.servico = resp
      alert('Anúncio publicado com sucesso!')
      this.servico = new Servico()
      this.getAllServicos()
    })
  }


}
