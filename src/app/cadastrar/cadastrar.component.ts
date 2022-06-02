import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string // o nome da variável foi colocado como confirmarSenha, com "r", pois o nome da variável não pode ser igual ao nome do método "confirmaSenha()"
  tipoDeUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoDeUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoDeUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas não coincidem.')
    } else{
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/entrar'])
          alert('Usuário cadastrado com sucesso')
        })
    }
  }



}
