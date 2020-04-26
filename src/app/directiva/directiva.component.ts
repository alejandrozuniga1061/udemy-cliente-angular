import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
   listaCurso:string[]=['Typescript', 'Java', 'PHP'];
   habilitar:boolean = false;
  constructor() { }

   cambiarHabilitar(){
     this.habilitar = !this.habilitar;
   }
}
