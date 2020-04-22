import { Virus } from './Virus';
import { Ubicacion } from './Ubicacion';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { ContentTypeEnum, Defaults } from '../api/API';
import { DatePipe } from '@angular/common';

// tslint:disable-next-line:no-namespace
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

    // Relations: BelongsToOne
    virus: Virus;
    ubicacion: Ubicacion;
    categoriaEstadistica: CategoriaEstadistica;

    // Relations: HasMany

    // Local
    localFecha: string;
    localDatePipe = new DatePipe('en-US');

    // Constructor
    constructor(estadistica?: any) {
        if (estadistica !== undefined) {
            this.idEstadistica = estadistica.idEstadistica;
            this.fkVirus = estadistica.fkVirus;
            this.fkUbicacion = estadistica.fkUbicacion;
            this.fkCategoriaEstadistica = estadistica.fkCategoriaEstadistica;
            this.valor = estadistica.valor;
            this.fecha = new Date(estadistica.fecha);
            this.localFecha = this.localDatePipe.transform(this.fecha, 'yyyy-MM-dd');
            // Relations
            this.categoriaEstadistica = new CategoriaEstadistica(estadistica.categoriaEstadistica);
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idEstadistica: this.idEstadistica,
            fkVirus: this.fkVirus,
            fkUbicacion: this.fkUbicacion,
            fkCategoriaEstadistica: this.fkCategoriaEstadistica,
            valor: this.valor,
            fecha: this.fecha // new Date(this.localFecha);
        };
    }
}
