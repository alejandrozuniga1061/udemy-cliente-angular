import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localCo from '@angular/common/locales/es-CO';
import { PaginadorComponent } from './paginador/paginador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
const routes : Routes = [
  {
    path: '', redirectTo: '/clientes', pathMatch: 'full'
  },
  {
    path:'directivas', component: DirectivaComponent
  },
  {
    path:'clientes', component: ClientesComponent
  },
  {
    path:'clientes/page/:page', component: ClientesComponent
  },
  {
    path:'clientes/page', component: ClientesComponent
  },
  {
    path:'clientes/form', component: FormComponent
  },
  {
    path:'clientes/form/:id', component: FormComponent
  }
];

registerLocaleData(localCo, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
