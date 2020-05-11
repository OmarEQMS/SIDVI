import { SubcategoriaEstadistica } from './SubcategoriaEstadistica';
import { ContentTypeEnum, Defaults } from '../api/API';
import { Ubicacion } from './Ubicacion';

// tslint:disable-next-line:no-namespace
export namespace _CategoriaEstadistica {
}

export interface ICategoriaEstadistica {
    idCategoriaEstadistica?: number;
    nombre?: string;
}

export class CategoriaEstadistica implements ICategoriaEstadistica {
    // Columns
    idCategoriaEstadistica?: number;
    nombre?: string;

    // Relations: BelongsToOne

    // Relations: HasMany
    subcategoriaEstadisticas: SubcategoriaEstadistica[];

    // Local

    // Constructor
    constructor(categoriaEstadistica?: any) {
        if (categoriaEstadistica !== undefined) {
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;

            if (categoriaEstadistica.subcategoriaEstadisticas != null) {
                this.subcategoriaEstadisticas = categoriaEstadistica.subcategoriaEstadisticas.map((item: any) => new SubcategoriaEstadistica(item));
            } else {
                this.subcategoriaEstadisticas = new Array();
            }
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idCategoriaEstadistica: this.idCategoriaEstadistica,
            nombre: this.nombre
        };
    }

}
