import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Ubicacion } from 'src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices } from 'src/api';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
    selector: 'app-ubicaciones-edit-list',
    templateUrl: './ubicaciones-edit-list.component.html',
    styleUrls: ['./ubicaciones-edit-list.component.scss'],
})
export class UbicacionesEditListComponent implements OnInit {
    @Input() ubicacion: Ubicacion;
    @Output() delete = new EventEmitter<number>();
    @Output() rename = new EventEmitter<number>();
    @Output() create = new EventEmitter<number>();
    @ViewChild('modalEditarUbicacion', null) modalEvaluarMedico: MDBModalRef;

    localUbicacion: Ubicacion;
    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(private sidvi: SIDVIServices) {
        this.localUbicacion = new Ubicacion();
    }

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

    emitDeleteUbicacion(idUbicacion: number) {
        this.delete.emit(idUbicacion);
    }

    deleteUbicacion(ubicacion: Ubicacion) {
        this.delete.emit(ubicacion.idUbicacion);
    }


}
