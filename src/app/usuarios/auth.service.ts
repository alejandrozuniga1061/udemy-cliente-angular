import { Usuario } from './usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario) {
      return this._usuario;
    } else {
      const usuarioStorage = sessionStorage.getItem('usuario');
      if (usuarioStorage) {
        this._usuario = JSON.parse(usuarioStorage) as Usuario;
        return this._usuario;
      }
      return new Usuario();
    }
  }

  public get token(): string {
    if (this._token) {
      return this._token;
    } else {
      const tokenStorage = sessionStorage.getItem('token');
      if (tokenStorage) {
        this._token = tokenStorage;
        return this._token;
      }
      return null;
    }
  }


  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345'); //pasa a base 64
    const httpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      }
    );
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.email = payload.email;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.obtenerDatosToken(this.token);
    return payload && payload.user_name && payload.user_name.length > 0;
  }

  hasRole(role:string){
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

}

