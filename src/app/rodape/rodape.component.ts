import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  nome= environment.nome
  foto= environment.foto
  id= environment.id

  constructor(
    private route: Router
  ) { }

  ngOnInit(){
  }

  sair(){
      this.route.navigate(['/home'])
      environment.token =''
      environment.nome =''
      environment.foto =''
      environment.id =0
  }
}
