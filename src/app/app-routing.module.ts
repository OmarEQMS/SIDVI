import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';

const routes: Routes = [
  { path: '', redirectTo: 'listVirus', pathMatch: 'full' },
  {
    path: 'listVirus',
    component: VirusListAllComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
