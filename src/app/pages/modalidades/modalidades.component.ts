import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import {Modalidad} from '../../models/modalidad.model';
import {ModalidadService} from '../../services/modalidad/modalidad.service';

@Component({
  selector: 'app-modalidades',
  templateUrl: './modalidades.component.html',
  styles: []
})
export class ModalidadesComponent implements OnInit {

  modalidades: Modalidad[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _modalidadService: ModalidadService
  ) { }

  ngOnInit() {
    this.cargarModalidades();
  }

  cargarModalidades() {

    this.cargando = true;

    this._modalidadService.cargarModalidades(this.desde)
            .subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.modalidades = resp.modalidades;
              this.cargando = false;
            });

  }


  desactivarModalidad(modalidad: Modalidad) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que desea desactivar la Modalidad?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        // Desactivar
        this._modalidadService.desactivarModalidad(modalidad)
            .subscribe( () => this.cargarModalidades());

      } else if (
        // cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelado', 'no se ha desactivado la Modalidad ', 'error');
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
    this.cargarModalidades();
  }



}
