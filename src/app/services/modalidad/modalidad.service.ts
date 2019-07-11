import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Modalidad } from '../../models/modalidad.model';
import { PersonaService } from '../persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  totalModalidades: number = 0;

  constructor(
    public http: HttpClient,
    public _personaService: PersonaService
  ) { }

  cargarModalidades(desde: number = 0) {

    let url = URL_SERVICIOS + '/modalidad?desde=' + desde;

    return this.http.get(url);

  }


  cargarModalidad(id: string) {

    let url= URL_SERVICIOS + '/modalidad/' + id;

    return this.http.get(url)
                .pipe(
                  map( (resp: any) => resp.modalidad));

  }


  desactivarModalidad(modalidad: Modalidad) {
    let url = URL_SERVICIOS + '/modalidad/delete/' + modalidad._id;
    url += '?token=' + this._personaService.token;

    return this.http.put( url, modalidad)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Modalidad Desactivado', modalidad.modalidad, 'success');
                return resp;
              }));
  }


  guardarModalidad(modalidad: Modalidad) {
    let url = URL_SERVICIOS + '/modalidad';

    if ( modalidad._id) {
      // actualizando
      url += '/' + modalidad._id;
      url += '?token=' + this._personaService.token;

      return this.http.put( url, modalidad)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Modalidad Actializada', modalidad.modalidad, 'success');
                return resp.modalidad;
              }));
    } else {
      // creando
      url += '?token=' + this._personaService.token;

      return this.http.post( url, modalidad)
              .pipe(
                map( (resp: any) => {
                  Swal.fire('Modalidad Creado', modalidad.modalidad, 'success');
                  return resp.modalidad;
                }));
    }
  }


}
