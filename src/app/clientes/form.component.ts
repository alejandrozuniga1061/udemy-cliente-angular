import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear cliente";
  private errors: string[];

  constructor(private clienteService:ClienteService,
    private router:Router,
    private activateRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activateRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.clienteService.getCliente(id, '/clientes')
          .pipe(
            tap( response => this.cliente = response) //Operador void para fijar información
            //a diferencia del map no devuelve nada pero se pueden ejecuta operaciones con objetos de la clase
          )
          .subscribe(
           // cliente => this.cliente = cliente
          )
        }
      }
    );
  }

  create():void{
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `Cliente ${response.nombre} creado con éxito!`, 'success');
      },
      err => {
        this.errors = err.error.errors as string[];
      }
    )
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      () => {
        this.router.navigate(['/clientes']);
        swal('Cliente actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito`, 'success');
      },
      err => {
        this.errors = err.error.errors as string[];
      }
    );
  }

}
