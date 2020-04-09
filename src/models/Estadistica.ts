import { Virus } from './Virus';
import { Ubicacion } from './Ubicacion';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { ContentTypeEnum, Defaults } from '../api';


export namespace _Estadistica {

}

export interface IEstadistica {
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkCategoriaEstadistica?: number;
    valor?: number;
    fecha?: Date;
}

export class Estadistica implements IEstadistica {

    // Columns
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkCategoriaEstadistica?: number;
    valor?: number;
    fecha?: Date;

    //Relations: BelongsToOne
    virus: Virus;
    ubicacion: Ubicacion;
    categoriaEstadistica: CategoriaEstadistica;

    // Relations: HasMany

    // Constructor
    constructor(estadistica?: any) {
        if (estadistica !== undefined) {
            this.idEstadistica = estadistica.idEstadistica;
            this.fkVirus = estadistica.fkVirus;
            this.fkUbicacion = estadistica.fkUbicacion;
            this.fkCategoriaEstadistica = estadistica.fkCategoriaEstadistica;
            this.valor = estadistica.valor;
            this.fecha = estadistica.fecha;
            // Relations
            this.categoriaEstadistica = new CategoriaEstadistica(estadistica.CategoriaEstadistica);
        }
    }

    //ToObjectDB
    toObjectDB(){
        return {
            idEstadistica: this.idEstadistica,
            fkVirus: this.fkVirus,
            fkUbicacion: this.fkUbicacion,
            fkCategoriaEstadistica: this.fkCategoriaEstadistica,
            valor: this.valor,
            fecha: this.fecha
        }
    }
}
