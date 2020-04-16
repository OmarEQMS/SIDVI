import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { Medico, MedicoVirus, Ubicacion, IUbicacion } from 'src/models';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-medico-virus-list',
    templateUrl: './medico-virus-list.component.html',
    styleUrls: ['./medico-virus-list.component.scss'],
})
export class MedicoVirusListComponent implements OnInit {
    medicosVirus: MedicoVirus[];
    idVirus: number;
    ubicacion: Ubicacion;
    ubicacionesIds: number[];
    filtrarNombre: string;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
            private sidvi: SIDVIServices,
            private activatedRoute: ActivatedRoute,
            private sanitizer: DomSanitizer
    ) {
        this.ubicacion = new Ubicacion({ idUbicacion: -1 } as IUbicacion);
    }

    ngOnInit() { }
    ionViewWillEnter() {
        this.ubicacionesIds = null;
        this.filtraUbicaciones();
    }


    filtrar() {
        this.ubicacionesIds = new Array(0);
        this.collectIds(this.ubicacion);
        console.log(this.ubicacionesIds);
        this.filtraUbicaciones();
    }
    async collectIds(ubicacion: Ubicacion) {
        if (ubicacion.localSelected) {
        this.ubicacionesIds.push(ubicacion.idUbicacion);
        if (ubicacion.ubicaciones == null) {
            await this.getUbicacionesHijo(ubicacion);
        }
        }
        if (ubicacion.ubicaciones == null) { return; }
        for (const ubi of ubicacion.ubicaciones) {
        this.collectIds(ubi);
        }
    }
    async getUbicacionesHijo(ubicacion: Ubicacion) {
        const result = await this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).toPromise();
        ubicacion.ubicaciones = result.resultados.map((item: any) => new Ubicacion(item));
        for (const ubi of ubicacion.ubicaciones) {
        ubi.localSelected = ubicacion.localSelected;
        this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).subscribe(
            res => { if (res.total > 0) { ubi.localPadre = true; ubi.localIcono = this.icons.plus; } });
        }
    }

    async filtraUbicaciones() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.sidvi.medicoVirus.listarMedicosVirus(null, this.idVirus, this.filtrarNombre, this.ubicacionesIds).subscribe(
        res => {
            this.medicosVirus = res.resultados.map((item: any) => new MedicoVirus(item));
            for (const medicoVirus of this.medicosVirus) {
                if (medicoVirus.medico.archivoFoto != null) {
                    medicoVirus.medico.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(
                        medicoVirus.medico.archivoFoto as string);
                    console.log(medicoVirus.medico.archivoIconoImg);
                }
            }
        },
        err => {
            console.log(err);

        }
        );
    }

}
