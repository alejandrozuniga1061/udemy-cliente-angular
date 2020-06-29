import { AuthService } from './../usuarios/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  titulo:string = 'Alejandro';
  constructor(public authService:AuthService, private router: Router){
    console.log(authService.usuario);
  }

  logout():void {
    swal('Logout', `Hola ${this.authService.usuario.username} has cerrado sesiòn con èxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
