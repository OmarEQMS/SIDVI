import { Estadistica } from './Estadistica';
import { ContentTypeEnum, Defaults } from '../api';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { Ubicacion } from './Ubicacion';

// tslint:disable-next-line:no-namespace
export namespace _SubcategoriaEstadistica {

}

export interface ISubcategoriaEstadistica {
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;
}

export class SubcategoriaEstadistica implements ISubcategoriaEstadistica {
    // Columns
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;

    // Relations: BelongsToOne
    categoriaEstadistica: CategoriaEstadistica;

    // Relations: HasMany
    estadisticas: Estadistica[];

    // Local
    localCategoriaEstadistica: CategoriaEstadistica;
    localUbicaciones: Ubicacion[];

    // Constructor
    constructor(subcategoriaEstadistica?: any) {
        if (subcategoriaEstadistica != null) {
            this.idSubcategoriaEstadistica = subcategoriaEstadistica.idSubcategoriaEstadistica;
            this.fkCategoriaEstadistica = subcategoriaEstadistica.fkCategoriaEstadistica;
            this.nombre = subcategoriaEstadistica.nombre;

            if (subcategoriaEstadistica.localUbicaciones != null) {
                this.localUbicaciones = subcategoriaEstadistica.localUbicaciones.map((item) => new Ubicacion(item));
            } else {
                this.localUbicaciones = new Array(0);
            }
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idSubcategoriaEstadistica: this.idSubcategoriaEstadistica,
            fkCategoriaEstadistica: this.fkCategoriaEstadistica,
            nombre: this.nombre
        };
    }

}
