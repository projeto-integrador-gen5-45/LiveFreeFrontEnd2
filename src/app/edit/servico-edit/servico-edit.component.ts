import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/Categoria';
import { environment } from '../../../environments/environment.prod';
import { ServicoService } from '../../service/servico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servico } from '../../model/Servico';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servico-edit',
  templateUrl: './servico-edit.component.html',
  styleUrls: ['./servico-edit.component.css']
})
export class ServicoEditComponent implements OnInit {

  servico: Servico = new Servico()

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdServico(id)
    this.findAllCategorias()
  }

  findByIdServico(id: number){
    this.servicoService.getByIdServico(id).subscribe((resp: Servico) => {
      this.servico = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
      this.listaCategorias = resp
    })
  }

  atualizar(){
    this.categoria.id = this.idCategoria
    this.servico.categoria = this.categoria

    this.servicoService.putServico(this.servico).subscribe((resp: Servico) => {
      this.servico = resp
      alert('Anúncio de serviço atualizado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
