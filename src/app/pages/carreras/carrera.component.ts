import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import {CarreraService} from '../../services/carrera/carrera.service';
import {Carrera} from '../../models/carrera.model';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styles: []
})
export class CarreraComponent implements OnInit {

  carrera: Carrera = new Carrera( '' );

  constructor(
    public _carreraService: CarreraService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo' ) {
        this.cargarCarrera(id);
      }
    });
   }

  ngOnInit() {
  }


  cargarCarrera(id: string) {
    this._carreraService.cargarCarrera(id)
        .subscribe( carrera => this.carrera = carrera);
  }


  guardarCarrera(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._carreraService.guardarCarrera(this.carrera)
        .subscribe( carrera => {
          this.carrera._id = carrera._id;
          this.router.navigate([ '/carrera', carrera._id]);
        });
  }


}
