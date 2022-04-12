import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();
  listaCategorias:Categoria[];


  constructor(
    private router: Router,
    private categoriaService: CategoriaService, 
    private alerta: AlertasService) { }
    
  ngOnInit(){
    if(environment.token==''){
      this.router.navigate(['/entrar'])
      }
    
      if(environment.tipo != 'admin'){
        
        this.alerta.showAlertInfo('Você precisa ser adm para acessar essa rota')
        this.router.navigate(['/inicio'])
      }  

      this.findAllCategorias()
    }

    findAllCategorias(){
      this.categoriaService.getAllCategorias().subscribe((resp: Categoria[])=>{
        this.listaCategorias = resp

      } )
    }

   cadastrar(){
      this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
        this.categoria = resp;
        this.alerta.showAlertSuccess("Categoria cadastrada com sucesso!");
        this.findAllCategorias();
        this.categoria = new Categoria()
      })
    }
}
