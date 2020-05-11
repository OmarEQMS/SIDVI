import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';
import { PerfilComponent } from './perfil/perfil.component';
import { VirusComponent } from './virus/virus.component';
import { EditarInformacionComponent } from './editar-informacion/editar-informacion.component';
import { EditarEstadisticaComponent } from './editar-estadistica/editar-estadistica.component';
import { EditarCatalogosComponent } from './editar-catalogos/editar-catalogos.component';
import { EditarMedicosComponent } from './editar-medicos/editar-medicos.component';
import { EditarTestComponent } from './editar-test/editar-test.component';

const routes: Routes = [
  { path: '', component: AdministradorPage,
    children: [
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'perfil', component: PerfilComponent },
        { path: 'virus/:idVirus', component: VirusComponent },
        { path: 'virus/:idVirus/informacion', component: EditarInformacionComponent },
        { path: 'virus/:idVirus/estadistica', component: EditarEstadisticaComponent },
        { path: 'consultorios', component: EditarMedicosComponent},
        { path: 'catalogos/:area', component: EditarCatalogosComponent },
        { path: 'editTest/:idVirus', component: EditarTestComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
