import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalidadService } from '../../services/service.index';
import { Modalidad } from '../../models/modalidad.model';

@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styles: []
})
export class ModalidadComponent implements OnInit {

  modalidad: Modalidad = new Modalidad( '' );

  constructor(
    public _modalidadService: ModalidadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarModalidad(id);
      }
    });
   }

  ngOnInit() {
  }

  cargarModalidad(id: string) {
    this._modalidadService.cargarModalidad(id)
        .subscribe( modalidad => this.modalidad = modalidad);
  }


  guardarModalidad(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._modalidadService.guardarModalidad(this.modalidad)
        .subscribe( modalidad => {
          this.modalidad._id = modalidad._id;
          this.router.navigate([ '/modalidad', modalidad._id]);
        });

  }


}
