import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Carrera } from '../../models/carrera.model';
import { PersonaService } from '../persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  totalCarreras: number = 0;

  constructor(
    public http: HttpClient,
    public _personaService: PersonaService
  ) { }

  
  cargarCarreras(desde: number = 0) {

    let url = URL_SERVICIOS + '/carrera?desde=' + desde;

    return this.http.get(url);

  }


  cargarCarrera( id: string) {

    let url = URL_SERVICIOS + '/carrera/' + id;

    return this.http.get(url)
              .pipe(
                map( (resp: any) => resp.carrera));

  }


  desactivarCarrera(carrera: Carrera) {

    let url = URL_SERVICIOS + '/carrera/delete/' + carrera._id;
    url += '?token=' + this._personaService.token;

    return this.http.put( url, carrera)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Carrera Desactivado', carrera.carrera , 'success');
                return resp;
              }));

  }


  guardarCarrera(carrera: Carrera) {

    let url = URL_SERVICIOS + '/carrera';

    if ( carrera._id) {
      // actualizando
      url += '/' + carrera._id;
      url += '?token=' + this._personaService.token;

      return this.http.put( url, carrera)
              .pipe(
                map( (resp: any) => {
                Swal.fire('Carrera Actualizado', carrera.carrera, 'success');
                return resp.carrera;
                }));

    } else {
      // creando
      url += '?token=' + this._personaService.token;
      return this.http.post( url, carrera )
            .pipe(
              map( (resp: any) => {
                Swal.fire('Carrera Creado', carrera.carrera, 'success');
                return resp.carrera;
              }));
    }
  }


}
