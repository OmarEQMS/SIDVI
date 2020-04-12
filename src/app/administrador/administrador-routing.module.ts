import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorPage } from './administrador.page';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: AdministradorPage,
    children: [
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'perfil', component: PerfilComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorPageRoutingModule {}
