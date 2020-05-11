import {  Estadistica } from './Estadistica';
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
    localSubcategoriaEstadisticas: SubcategoriaEstadistica[];
    localEstadistica: Estadistica;

    // Constructor
    constructor(subcategoriaEstadistica?: any) {
        if (subcategoriaEstadistica != null) {
            this.idSubcategoriaEstadistica = subcategoriaEstadistica.idSubcategoriaEstadistica;
            this.fkCategoriaEstadistica = subcategoriaEstadistica.fkCategoriaEstadistica;
            this.nombre = subcategoriaEstadistica.nombre;

            if (subcategoriaEstadistica.localSubcategoriaEstadisticas != null) {
                this.localSubcategoriaEstadisticas = subcategoriaEstadistica.localSubcategoriaEstadisticas.map((item) => new SubcategoriaEstadistica(item));
            }
            this.localEstadistica = subcategoriaEstadistica.localEstadistica != null ? new Estadistica(subcategoriaEstadistica.localEstadistica) : null;
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
