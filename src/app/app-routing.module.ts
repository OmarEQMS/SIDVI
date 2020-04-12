import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';
import { LoginComponent } from './components/login/login.component';
import { InformacionComponent } from './components/informacion/informacion.component';

const routes: Routes = [

  // Components
  { path: '', redirectTo: 'listVirus', pathMatch: 'full' },
  {
    path: 'listVirus',
    component: VirusListAllComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'informacion/:idVirus',
    component: InformacionComponent
  },

  // Pages
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
