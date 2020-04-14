import { Component, OnInit } from '@angular/core';
import { Ubicacion, Estadistica, IUbicacion } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices } from 'src/api';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
    ubicacion: Ubicacion;
    ubicacionesIds: number[];
    estadisticas: Estadistica[];
    idVirus: number;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute
    ) {
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacionesIds = new Array(0);
    }

    filtrar() {
        this.ubicacionesIds = new Array(0);
        this.collectIds(this.ubicacion);
        console.log(this.ubicacionesIds);
    }
    async collectIds(ubicacion: Ubicacion) {
        if (ubicacion.localSelected) {
            this.ubicacionesIds.push(ubicacion.idUbicacion);
            if (ubicacion.ubicaciones == null){
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
                res => { if (res.total > 0) { ubi.localPadre = true; ubi.localIcono = this.icons.plus; }} );
        }
    }

}
