import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() selected = new EventEmitter<number>();

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
        private sidvi: SIDVIServices
    ) { }

    ngOnInit() { }

    expandUbicacion(ubicacion: Ubicacion) {
        if (ubicacion.localVisible) {
            ubicacion.localVisible = false;
            ubicacion.localIcono = this.icons.plus;
        } else if (ubicacion.localPadre) {
            ubicacion.localVisible = true;
            ubicacion.localIcono = this.icons.minus;
        }
    }

    emitUbicacion(idUbicacion: number) {
        this.selected.emit(idUbicacion);
    }

    selectUbicacion(ubicacion: Ubicacion) {
        this.changeUbicacion(ubicacion, !ubicacion.localSelected);
        this.selected.emit(ubicacion.idUbicacion);
    }

    changeUbicacion(ubicacion: Ubicacion, select: boolean) {
        ubicacion.localSelected = select;
        if (ubicacion.ubicaciones == null) { return; }
        for (const ubi of ubicacion.ubicaciones) {
            this.changeUbicacion(ubi, select);
        }
    }

}
