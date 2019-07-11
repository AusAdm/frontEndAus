import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Proceso } from '../../models/proceso.model';
import { PersonaService } from '../persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  totalProcesos: number = 0;

  constructor(
    public http: HttpClient,
    public _personaService: PersonaService
  ) { }

  cargarProcesos(desde: number = 0) {

    let url = URL_SERVICIOS + '/proceso?desde=' + desde;

    return this.http.get(url);

  }

  cargarProceso(id: string) {

    let url= URL_SERVICIOS + '/proceso/' + id;

    return this.http.get(url)
                .pipe(
                  map( (resp: any) => resp.proceso));

  }


  desactivarProceso(proceso: Proceso) {
    let url = URL_SERVICIOS + '/proceso/delete/' + proceso._id;
    url += '?token=' + this._personaService.token;

    return this.http.put( url, proceso)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Proceso Desactivado', proceso.proceso, 'success');
                return resp;
              }));
  }

  guardarProceso(proceso: Proceso) {
    let url = URL_SERVICIOS + '/proceso';

    if ( proceso._id) {
      // actualizando
      url += '/' + proceso._id;
      url += '?token=' + this._personaService.token;

      return this.http.put( url, proceso)
            .pipe(
              map( (resp: any) => {
                Swal.fire('Proceso Actializado', proceso.proceso, 'success');
                return resp.proceso;
              }));
    } else {
      // creando
      url += '?token=' + this._personaService.token;

      return this.http.post( url, proceso)
              .pipe(
                map( (resp: any) => {
                  Swal.fire('Proceso Creado', proceso.proceso, 'success');
                  return resp.proceso;
                }));
    }
  }


}
