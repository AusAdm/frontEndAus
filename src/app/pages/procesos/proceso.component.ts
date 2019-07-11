import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ProcesoService} from '../../services/proceso/proceso.service';
import {Proceso} from '../../models/proceso.model';


@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styles: []
})
export class ProcesoComponent implements OnInit {

  proceso: Proceso = new Proceso( '' );

  constructor(
    public _procesoService: ProcesoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarProceso(id);
      }
    });
   }

  ngOnInit() {
  }

  cargarProceso(id: string) {
    this._procesoService.cargarProceso(id)
        .subscribe( proceso => this.proceso = proceso);
  }

  guardarProceso(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._procesoService.guardarProceso(this.proceso)
        .subscribe( proceso => {
          this.proceso._id = proceso._id;
          this.router.navigate([ '/proceso', proceso._id]);
        });

  }



}
