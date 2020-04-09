import { ContentTypeEnum, Defaults } from '../api/API';

import { Medico } from './Medico';

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

    // Constructor
    constructor(ubicacion?: any) {
        if (ubicacion !== undefined) {
            this.idUbicacion = ubicacion.idUbicacion;
            this.fkUbicacion = ubicacion.fkUbicacion;
            this.clave = ubicacion. clave;
            this.nombre = ubicacion.nombre;
        }
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
