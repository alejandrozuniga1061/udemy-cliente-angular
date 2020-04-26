import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador:any;

  constructor(private clienteService: ClienteService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      const page: number = +params.get('page') || 0;
      this.clienteService.getClientes(page).subscribe(
        (clientes: any) => {
          this.clientes = clientes.content as Cliente[];
          this.paginador = clientes;
        }
      );
    });
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Estás seguro?',
      text: `¿Seguro de eliminar ${cliente.nombre} ${cliente.apellido}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar.',
      cancelButtonText: "No, cancelar."
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal(
              'Eliminado!',
              `${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        );
      }
    })
  }

}
