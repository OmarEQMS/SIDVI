import {  Estadistica } from '../models';
import { ContentTypeEnum, Defaults } from '../api';
import { CategoriaEstadistica } from './CategoriaEstadistica';

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

    // Constructor
    constructor(subcategoriaEstadistica?: any) {
        if (subcategoriaEstadistica != null) {
            this.idSubcategoriaEstadistica = subcategoriaEstadistica.idSubcategoriaEstadistica;
            this.fkCategoriaEstadistica = subcategoriaEstadistica.fkCategoriaEstadistica;
            this.nombre = subcategoriaEstadistica.nombre;
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
