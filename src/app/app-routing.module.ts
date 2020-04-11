import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';
import { LoginComponent } from './components/login/login.component';

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

  // Pages
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  {
    path: 'administrador',
    loadChildren: () => import('./pages/administrador/administrador.module').then(m => m.AdministradorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
