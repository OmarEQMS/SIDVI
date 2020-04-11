import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';


import { SIDVIServices, CategoriaEstadisticaService, CategoriaInformacionService,
        CelularEstadoService, EstadisticaService, InformacionService, MedicoService,
        MedicoVirusService, TestNodoService, TestOpcionService, UbicacionService,
        UsuarioService, ValoracionService, VirusService, ManagerService} from 'src/api';

@NgModule({
  declarations: [
    AppComponent,
    VirusListAllComponent,
    NavigationComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    ManagerService,
    CategoriaEstadisticaService,
    CategoriaInformacionService,
    CelularEstadoService,
    EstadisticaService,
    InformacionService,
    MedicoService,
    MedicoVirusService,
    TestNodoService,
    TestOpcionService,
    UbicacionService,
    UsuarioService,
    ValoracionService,
    VirusService,
    SIDVIServices,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private manager: ManagerService) {
    manager.basePath = 'http://localhost:8000';
  }
}
