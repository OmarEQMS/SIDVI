import { Virus } from './Virus';
import { ContentTypeEnum, Defaults } from '../api';


// tslint:disable-next-line:no-namespace
export namespace _CelularEstado {
    export type Seccion = 'MEDICO' | 'INFORMACION' | 'TEST' | 'ESTADISTICA';
    export const Seccion = {
        MEDICO: 'MEDICO' as Seccion,
        INFORMACION: 'INFORMACION' as Seccion,
        TEST: 'TEST' as Seccion,
        ESTADISTICA: 'ESTADISTICA' as Seccion,
    };
}

export interface ICelularEstado {
    idCelularEstado?: number;
    celular?: string;
    fkVirus?: number;
    seccion?: _CelularEstado.Seccion;
    fk?: number;
}

export class CelularEstado implements ICelularEstado {

    // Columns
    idCelularEstado?: number;
    celular?: string;
    fkVirus?: number;
    seccion?: _CelularEstado.Seccion;
    fk?: number;

    // Relations: BelongsToOne
    virus: Virus;

    // Relations: HasMany

    // Constructor
    constructor(celularEstado?: any) {
        if (celularEstado !== undefined) {
            this.idCelularEstado = celularEstado.idCelularEstado;
            this.celular = celularEstado.celular;
            this.fkVirus = celularEstado.fkVirus;
            this.seccion = celularEstado.seccion;
            this.fk = celularEstado.fk;
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idCelularEstado: this.idCelularEstado,
            celular: this.celular,
            fkVirus: this.fkVirus,
            seccion: this.seccion,
            fk: this.fk
        };
    }
}
