import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {Proceso} from '../../models/proceso.model';
import {ProcesoService} from '../../services/proceso/proceso.service';



@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
})
export class ProcesosComponent implements OnInit {

  procesos: Proceso[] = [];

  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _procesoService: ProcesoService
  ) { }

  ngOnInit() {
    this.cargarProcesos();
  }

  cargarProcesos() {

    this.cargando = true;

    this._procesoService.cargarProcesos(this.desde)
            .subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.procesos = resp.procesos;
              this.cargando = false;
            });

  }


  desactivarProceso(proceso: Proceso) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que desea desactivar el Proceso?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {

      if (result.value) {
        // Desactivar
        this._procesoService.desactivarProceso(proceso)
            .subscribe( () => this.cargarProcesos());

      } else if (
        // cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelado', 'no se ha desactivado el Requisito ', 'error');
      }
    });
  }


  // Paginacion
  cambiarDesde( valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarProcesos();
  }

}
