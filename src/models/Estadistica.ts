import { Virus } from './Virus';
import { Ubicacion } from './Ubicacion';
import { ContentTypeEnum, Defaults } from '../api/API';
import { DatePipe } from '@angular/common';
import { SubcategoriaEstadistica } from './SubcategoriaEstadistica';
import { createDate } from 'src/api/Tools';

// tslint:disable-next-line:no-namespace
export namespace _Estadistica {
}

export interface IEstadistica {
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkSubcategoriaEstadistica1?: number;
    fkSubcategoriaEstadistica2?: number;
    valor?: number;
    fecha?: Date;
}

export class Estadistica implements IEstadistica {
    // Columns
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkSubcategoriaEstadistica1?: number;
    fkSubcategoriaEstadistica2?: number;
    valor?: number;
    fecha?: Date;

    // Relations: BelongsToOne
    virus: Virus;
    ubicacion: Ubicacion;
    subcategoriaEstadistica1: SubcategoriaEstadistica;
    subcategoriaEstadistica2: SubcategoriaEstadistica;

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
            this.fkSubcategoriaEstadistica1 = estadistica.fkSubcategoriaEstadistica1;
            this.fkSubcategoriaEstadistica2 = estadistica.fkSubcategoriaEstadistica2;
            this.valor = estadistica.valor;
            this.fecha = estadistica.fecha;
            this.localFecha = this.localDatePipe.transform(this.fecha, 'yyyy-MM-dd');
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idEstadistica: this.idEstadistica,
            fkVirus: this.fkVirus,
            fkUbicacion: this.fkUbicacion,
            fkSubcategoriaEstadistica1: this.fkSubcategoriaEstadistica1,
            fkSubcategoriaEstadistica2: this.fkSubcategoriaEstadistica2,
            valor: this.valor,
            fecha: this.localFecha
        };
    }
}
