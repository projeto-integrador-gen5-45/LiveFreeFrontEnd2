import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../model/Categoria';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoria: Categoria = new Categoria()

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }

  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  atualizar(){
    console.log(this.categoria)
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.alerta.showAlertSuccess('Categoria atualizada com sucesso!')
      this.router.navigate(['/categoria'])
    })
  }

}