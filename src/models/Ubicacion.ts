import { ContentTypeEnum, Defaults } from '../api/API';

import { Medico } from './Medico';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Estadistica } from './Estadistica';
import { DatePipe } from '@angular/common';

// tslint:disable-next-line:no-namespace
export namespace _Ubicacion {
}

export interface IUbicacion {
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;
    latitud?: number;
    longitud?: number;
    archivoMapa?: string;
    identificadorMapa?: string;
}

export class Ubicacion implements IUbicacion {

    // Columns
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;
    latitud?: number;
    longitud?: number;
    archivoMapa?: string;
    identificadorMapa?: string;

    // Relations: BelongsToOne
    ubicacion?: Ubicacion;

    // Relations: HasMany
    ubicaciones?: Ubicacion[];
    medicos?: Medico[];

    // Local
    localSelected: boolean;
    localVisible: boolean;
    localIcono: IconDefinition;
    localPadre: boolean;
    localEstadistica: Estadistica;

    // Constructor
    constructor(ubicacion?: any, ubicaciones?: Ubicacion[], localEstadistica?: Estadistica) {
        if (ubicacion !== undefined) {
            this.idUbicacion = ubicacion.idUbicacion;
            this.fkUbicacion = ubicacion.fkUbicacion;
            this.clave = ubicacion. clave;
            this.nombre = ubicacion.nombre;
            this.latitud = ubicacion.latitud;
            this.longitud = ubicacion.longitud;
            this.archivoMapa = ubicacion.archivoMapa;
            this.identificadorMapa = ubicacion.identificadorMapa;

            this.localSelected = ubicacion.localSelected != null ? ubicacion.localSelected : true;
        }
        if (ubicaciones != null) {
            this.ubicaciones = ubicaciones.map((item: Ubicacion) => new Ubicacion(item, item.ubicaciones, item.localEstadistica));
        }
        if (localEstadistica != null) {
            this.localEstadistica = new Estadistica(localEstadistica);
        }
        this.localVisible = false;
        this.localPadre = false;
        this.localIcono = faMinus;
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idUbicacion: this.idUbicacion,
            fkUbicacion: this.fkUbicacion,
            clave: this.clave,
            nombre: this.nombre
        };
    }
}
