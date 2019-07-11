import { Component, OnInit } from '@angular/core';
import { Requisito } from '../../models/requisito.model';
import { RequisitoService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styles: []
})
export class RequisitosComponent implements OnInit {

   requisitos: Requisito[] = [];

   desde: number = 0;
   totalRegistros: number = 0;

   cargando: boolean = true;

  constructor(
    public _requisitoService: RequisitoService
  ) { }

  ngOnInit() {
    this.cargarRequisitos();
  }

  cargarRequisitos() {

    this.cargando = true;

    this._requisitoService.cargarRequisitos(this.desde)
          .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.requisitos = resp.requisitos;
            this.cargando = false;
          });
  }

  desactivarRequisito(requisito: Requisito) {

      this._requisitoService.desactivarRequisito(requisito)
      .subscribe( () => this.cargarRequisitos());

  }


  // paginacion
  cambiarDesde( valor: number) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarRequisitos();

  }

}
