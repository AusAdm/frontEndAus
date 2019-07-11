import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'}
      ]
    },
    {
      titulo: 'Postulantes',
      icono: 'fa fa-address-card-o',
      submenu: [
        {titulo: 'Pre-Inscripciones', url: '/preInscripciones'},
        {titulo: 'Inscripciones', url: '/inscripciones'},
      ]
    } ,
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Personas', url: '/personas'},
        {titulo: 'Procesos', url: '/procesos'},
        {titulo: 'Modalidades', url: '/modalidades'},
        {titulo: 'Carreras', url: '/carreras'},
        {titulo: 'Requisitos', url: '/requisitos'},
        {titulo: 'Modalidad Proceso', url: '/modPros'},
        {titulo: 'Detalle Modalidad Proceso', url: '/detalleModPros'},
        {titulo: 'Requisito Modalidad', url: '/reqMods'}
      ]
    }
  ];

  constructor() { }
}
