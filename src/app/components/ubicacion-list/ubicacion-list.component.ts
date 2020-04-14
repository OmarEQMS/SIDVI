import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion } from 'src/models';
import { SIDVIServices } from 'src/api';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ubicacion-list',
  templateUrl: './ubicacion-list.component.html',
  styleUrls: ['./ubicacion-list.component.scss'],
})
export class UbicacionListComponent implements OnInit {
    @Input() ubicacion: Ubicacion;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
        private sidvi: SIDVIServices
    ) { }

    ngOnInit() { this.cargarUbicaciones(); }

    cargarUbicaciones() {
        if (this.ubicacion.ubicaciones != null) { return; }

        this.sidvi.ubicacion.listarUbicaciones(this.ubicacion.idUbicacion).subscribe(
            ubicaciones => {
                this.ubicacion.ubicaciones = ubicaciones.resultados.map((item: any) => new Ubicacion(item));

                for (const ubicacion of this.ubicacion.ubicaciones) {
                    ubicacion.localSelected = this.ubicacion.localSelected;
                    this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).subscribe(
                        res => { if (res.total > 0) { ubicacion.localPadre = true; ubicacion.localIcono = this.icons.plus; }} );
                }
        });
    }

    expandUbicacion(ubicacion: Ubicacion) {
        if (ubicacion.localVisible) {
            ubicacion.localVisible = false;
            ubicacion.localIcono = this.icons.plus;
        } else if (ubicacion.localPadre) {
            ubicacion.localVisible = true;
            ubicacion.localIcono = this.icons.minus;
        }
    }

    selectUbicacion(ubicacion: Ubicacion) {
        this.changeUbicacion(ubicacion, !ubicacion.localSelected);
    }

    changeUbicacion(ubicacion: Ubicacion, select: boolean) {
        ubicacion.localSelected = select;
        if (ubicacion.ubicaciones == null) { return; }
        for (const ubi of ubicacion.ubicaciones) {
            this.changeUbicacion(ubi, select);
        }
    }

}
