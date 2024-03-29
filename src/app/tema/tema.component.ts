import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../Model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    if (environment.tipo != 'adm') {
      this.alertas.showAlertInfo('Essa rota é restrita para usuário do tipo administrador!')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertInfo('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

}
