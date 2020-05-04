import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';
import { LoginComponent } from './components/login/login.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { MedicoVirusListComponent } from './components/medico-virus-list/medico-virus-list.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import {MiConsultorioComponent} from './components/mi-consultorio/mi-consultorio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TestComponent } from './components/test/test.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
    { path: '', redirectTo: 'virus', pathMatch: 'full' },
    { path: 'virus', component: VirusListAllComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mi-consultorio', component: MiConsultorioComponent },
    { path: 'informacion/:idVirus', component: InformacionComponent },
    { path: 'medicos/:idVirus', component: MedicoVirusListComponent},
    { path: 'estadistica/:idVirus', component: EstadisticaComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'test/:idTestNodo', component: TestComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'administrador', loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
