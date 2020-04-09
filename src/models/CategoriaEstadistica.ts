import { Estadistica } from './Estadistica';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

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

    //Relations: BelongsToOne

    // Relations: HasMany
    estadisticas: Estadistica[];

    // Constructor
    constructor(categoriaEstadistica?: any) {
        if (categoriaEstadistica !== undefined) {
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;
        }
    }

    //ToObjectDB
    toObjectDB(){
        return {
            idCategoriaEstadistica: this.idCategoriaEstadistica,
            nombre: this.nombre
        }
    }
}
