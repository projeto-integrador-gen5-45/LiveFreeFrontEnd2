import { environment } from '../../../environments/environment.prod';
import { ServicoService } from '../../service/servico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Servico } from '../../model/Servico';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-servico-delete',
  templateUrl: './servico-delete.component.html',
  styleUrls: ['./servico-delete.component.css']
})
export class ServicoDeleteComponent implements OnInit {

  servico: Servico = new Servico()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdServico(this.idPost)
  }

  findByIdServico(id: number){
    this.servicoService.getByIdServico(id).subscribe((resp: Servico) => {
      this.servico = resp
    })
  }


  apagar(){
    this.servicoService.deleteServico(this.idPost).subscribe(()=>{
      this.alerta.showAlertSuccess('Serviço apagado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
