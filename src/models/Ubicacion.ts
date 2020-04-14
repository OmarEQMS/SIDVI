import { ContentTypeEnum, Defaults } from '../api/API';

import { Medico } from './Medico';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

// tslint:disable-next-line:no-namespace
export namespace _Ubicacion {
}

export interface IUbicacion {
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;
}

export class Ubicacion implements IUbicacion {

    // Columns
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;

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

    // Constructor
    constructor(ubicacion?: any) {
        if (ubicacion !== undefined) {
            this.idUbicacion = ubicacion.idUbicacion;
            this.fkUbicacion = ubicacion.fkUbicacion;
            this.clave = ubicacion. clave;
            this.nombre = ubicacion.nombre;
        }
        this.localSelected = false;
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
