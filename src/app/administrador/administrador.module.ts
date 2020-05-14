import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';
import { PerfilComponent } from './perfil/perfil.component';
import { VirusComponent } from './virus/virus.component';
import { EditarInformacionComponent } from './editar-informacion/editar-informacion.component';
import { EditarEstadisticaComponent } from './editar-estadistica/editar-estadistica.component';
import { EditarCatalogosComponent } from './editar-catalogos/editar-catalogos.component';
import { UbicacionListComponent } from '../components/ubicacion-list/ubicacion-list.component';
import { UbicacionesEditListComponent } from './ubicaciones-edit-list/ubicaciones-edit-list.component';
import { EditarMedicosComponent } from './editar-medicos/editar-medicos.component';
import { EditarTestComponent } from './editar-test/editar-test.component';
import { ListarPreguntasComponent } from './listar-preguntas/listar-preguntas.component';
import {_Usuario} from '../../models/Usuario';
import { Router } from '@angular/router';
import { SIDVIServices } from 'src/api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdministradorPageRoutingModule,
    FontAwesomeModule,
    PdfViewerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    AdministradorPage,
    PerfilComponent,
    VirusComponent,
    EditarInformacionComponent,
    EditarEstadisticaComponent,
    EditarCatalogosComponent,
    UbicacionesEditListComponent,
    EditarMedicosComponent,
    EditarTestComponent,
    ListarPreguntasComponent
  ]
})
export class AdministradorPageModule {

  rol: _Usuario.Rol;
  constructor(private router: Router, private sidvi: SIDVIServices) {
    this.rol = this.sidvi.manager.usuario.rol;
    if (this.rol !== 'ADMINISTRADOR') {
      this.router.navigate(['./virus']);
    }
  }

}
