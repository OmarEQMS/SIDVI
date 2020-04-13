import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

// Imports
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { VirusListAllComponent } from './components/virus-list-all/virus-list-all.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { MedicoVirusListComponent } from './components/medico-virus-list/medico-virus-list.component';


// Services
import { SIDVIServices, CategoriaEstadisticaService, CategoriaInformacionService,
        CelularEstadoService, EstadisticaService, InformacionService, MedicoService,
        MedicoVirusService, TestNodoService, TestOpcionService, UbicacionService,
        UsuarioService, ValoracionService, VirusService, ManagerService} from 'src/api';


@NgModule({
  declarations: [
    AppComponent,
    VirusListAllComponent,
    LoginComponent,
    NavigationComponent,
    InformacionComponent,
    MedicoVirusListComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PdfViewerModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MDBBootstrapModule.forRoot()
  ],
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
