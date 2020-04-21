import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { Medico, MedicoVirus, Ubicacion, IUbicacion, Valoracion } from 'src/models';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { async } from '@angular/core/testing';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
    selector: 'app-medico-virus-list',
    templateUrl: './medico-virus-list.component.html',
    styleUrls: ['./medico-virus-list.component.scss'],
})
export class MedicoVirusListComponent implements OnInit {
    @ViewChild('modalEvaluarMedico', null) modalEvaluarMedico: MDBModalRef;

    medicosVirus: MedicoVirus[];
    idVirus: number;
    nombre: string;
    ubicacion: Ubicacion;
    ubicacionesIds: number[];
    cal: number;
    localMedVirus: MedicoVirus;
    valoracion: Valoracion;

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
        this.localMedVirus = new MedicoVirus();
        this.localMedVirus.medico = new Medico();
        this.cal = 0;
    }

    ngOnInit() { }
    async ionViewWillEnter() {
        this.ubicacionesIds = null;
        this.nombre = null;
        await this.getUbicacionesHijo(this.ubicacion);
        this.filtraUbicaciones();
    }


    filtrar() {
        this.ubicacionesIds = new Array(0);
        this.collectIds(this.ubicacion);
        console.log(this.ubicacionesIds);
        this.filtraUbicaciones();
    }

    collectIds(ubicacion: Ubicacion) {
        if (ubicacion.localSelected) {
            this.ubicacionesIds.push(ubicacion.idUbicacion);
        }
        if (ubicacion.ubicaciones == null) { return; }
        for (const ubi of ubicacion.ubicaciones) {
            this.collectIds(ubi);
        }
    }

    async getUbicacionesHijo(ubicacion: Ubicacion) {
        const result = await this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).toPromise();
        ubicacion.ubicaciones = result.resultados.map((item: any) => new Ubicacion(item));
        if (result.total > 0) { ubicacion.localPadre = true; ubicacion.localIcono = this.icons.plus; }

        for (const ubi of ubicacion.ubicaciones) {
            ubi.localSelected = ubicacion.localSelected;
            await this.getUbicacionesHijo(ubi);
        }
    }

    filtraUbicaciones() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.sidvi.medicoVirus.listarMedicosVirus(null, this.idVirus, this.nombre, this.ubicacionesIds).subscribe(
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

    evaluarMedico(valor: number) {
        this.cal = valor;
    }

    enviarEvaluacion() {
        this.valoracion = new Valoracion({
            fkMedicoVirus: this.localMedVirus.idMedicoVirus,
            fkUsuario: 1,
            valoracion: this.cal
        });
        this.sidvi.valoracion.crearValoracion(this.valoracion).subscribe(
            res => {
                console.log(res);
                this.modalEvaluarMedico.hide();
            },
            err => {
                console.log(err);
            }
            );
    }

}
