import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../Model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor( 
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ){}
    
  

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe({ next: (resp: UsuarioLogin)=>{
      this.usuarioLogin = resp 

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id
      environment.tipo = this.usuarioLogin.tipo

      this.router.navigate(['/inicio'])
    },
    error: erro => {
      if(erro.status == 401) {
        this.alertas.showAlertInfo('Usuário ou senha estão incorretos')
      }
    },
  });

  }

}