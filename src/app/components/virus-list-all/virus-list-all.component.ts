import { Component, OnInit, ɵConsole, ViewChild, ElementRef  } from '@angular/core';
import {SIDVIServices} from '../../../api';
import {Router} from '@angular/router';
import { Virus } from 'src/models';
import { _Usuario } from '../../../models/Usuario';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
selector: 'app-virus-list-all',
templateUrl: './virus-list-all.component.html',
styleUrls: ['./virus-list-all.component.scss'],
})
export class VirusListAllComponent implements OnInit {
    @ViewChild('alert', { static: true }) alert: ElementRef;
    viruss: Virus[];
    rol: _Usuario.Rol;

    constructor(private sidvi: SIDVIServices, private router: Router, private sanitizer: DomSanitizer) { 
        this.rol = this.sidvi.manager.usuario.rol;
    }

    ngOnInit() {
        this.closeAlert();
    }

    ionViewWillEnter() {
        this.sidvi.virus.listarVirus().subscribe(
        res => {
            this.viruss = res.resultados;
            for (const virus of this.viruss) {
            virus.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(virus.archivoIcono as string);
            // console.log(virus.archivoIconoImg);
            }
            // console.log(this.viruss);
        },
        err => { console.log(err); }
        );
    }

    abrirTest(idTestNodo: number) {
        this.sidvi.manager.historial = new Array();
        this.router.navigate(['/test', idTestNodo]);
    }

    registrarConsultorio() {
        // Revisar si el usuario ya inicio sesion
        if (this.sidvi.manager.tokenUsuario && this.rol !== _Usuario.Rol.ADMINISTRADOR) {
            this.router.navigate(['/mi-consultorio']);
        } else if (this.sidvi.manager.tokenUsuario && this.rol === _Usuario.Rol.ADMINISTRADOR) {
            this.openAlert();
        } else {
            this.router.navigate(['/login']);
        }
    }

    closeAlert() {
        this.alert.nativeElement.classList.remove('show');
        this.alert.nativeElement.classList.add('inBack');
        this.alert.nativeElement.classList.remove('inFront');
    }
    openAlert() {
        this.alert.nativeElement.classList.add('show');
        this.alert.nativeElement.classList.add('inFront');
        this.alert.nativeElement.classList.remove('inBack');
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['./login']);
    }
}
