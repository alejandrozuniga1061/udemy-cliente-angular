import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor sign in!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal('Login', `Hola ${this.authService.usuario.username} ya estàs autenticado`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error login', 'Falta información para loguear', 'error');
      return;
    }

    this.authService.login(this.usuario)
      .subscribe(response => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        const usuario = this.authService.usuario;
        this.router.navigate(['/clientes']);
        swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      },
      err => {
        if(err.status === 400){
          swal('Error Login', 'Usuario o clave incorrecta', 'error');
        }
      }
    );
  }

}
