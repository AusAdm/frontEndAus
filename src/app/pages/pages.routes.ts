import {RouterModule, Routes} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogingGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

import { RequisitoComponent } from './requisitos/requisito.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { PersonasComponent } from './personas/personas.component';
import { ProcesoComponent } from './procesos/proceso.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { ModalidadesComponent } from './modalidades/modalidades.component';
import { ModalidadComponent } from './modalidades/modalidad.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { CarreraComponent } from './carreras/carrera.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LogingGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },

            // mantenimientos
            {path: 'requisitos', component: RequisitosComponent, data: {titulo: 'Mantenimiento de requisitos'} },
            {path: 'requisito/:id', component: RequisitoComponent, data: {titulo: 'Requisitos'} },

            {path: 'procesos', component: ProcesosComponent, data: {titulo: 'Mantenimiento de procesos'} },
            {path: 'proceso/:id', component: ProcesoComponent, data: {titulo: 'Proceso'} },

            {path: 'modalidades', component: ModalidadesComponent, data: {titulo: 'Mantenimiento de modalidades'} },
            {path: 'modalidad/:id', component: ModalidadComponent, data: {titulo: 'Modalidad'} },

            {path: 'carreras', component: CarrerasComponent, data: {titulo: 'Mantenimiento de carreras'} },
            {path: 'carrera/:id', component: CarreraComponent, data: {titulo: 'Carrera'} },

            /* rutas:
            Modalidad Proceso -> modPros
            Detalle Modalidad Proceso -> detalleModPros
            Requisito Modalidad -> reqMods
            Pre-Inscripciones -> preInscripciones
            Inscripciones -> inscripciones*/

            {path: 'personas', component: PersonasComponent, data: {titulo: 'Mantenimiento de usuarios'} },

            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);