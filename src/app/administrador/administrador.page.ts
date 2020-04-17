import { Component, OnInit } from '@angular/core';
import { Virus } from 'src/models';
import { SIDVIServices } from 'src/api';
import { IconDefinition, faSignOutAlt, faVirus, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
    viruss: Virus[];

    icons: { [id: string]: IconDefinition } = {
        close: faSignOutAlt,
        virus: faVirus,
        user: faUser
    };

    constructor(
        private sidvi: SIDVIServices,
        private _router: Router
    ) {
        this.viruss = new Array(0);
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.sidvi.virus.listarVirus().subscribe(
            viruss => {
                this.viruss = viruss.resultados.map((item: any) => new Virus(item));
        });
    }

    abrirPerfil() {

    }

    abrirVirus(virus: Virus) {
        this._router.navigate(['./administrador/virus/' + virus.idVirus]);
    }

    cerrarSesion() {

    }

}
