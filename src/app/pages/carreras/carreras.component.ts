import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {Carrera} from '../../models/carrera.model';
import {CarreraService} from '../../services/carrera/carrera.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styles: []
})
export class CarrerasComponent implements OnInit {

  carreras: Carrera[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _carreraService: CarreraService
  ) { }

  ngOnInit() {
    this.cargarCarreras();
  }

  cargarCarreras() {

    this.cargando = true;

    this._carreraService.cargarCarreras(this.desde)
            .subscribe( (resp: any) => {
              this.totalRegistros = resp.total;
              this.carreras = resp.carreras;
              this.cargando = false;
            });

  }


  desactivarCarrera(carrera: Carrera) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Â¿Estas seguro que desea desactivar la Carrera?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Desactivar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        // Desactivar
        this._carreraService.desactivarCarrera(carrera)
            .subscribe( () => this.cargarCarreras());

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
    this.cargarCarreras();
  }



}
