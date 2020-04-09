import { RelationMappings, Model } from 'objection';

import { BaseModel, Virus } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CelularEstado {
    export type Seccion = 'MEDICO' | 'INFORMACION' | 'TEST' | 'ESTADISTICA';
    export const Seccion = {
        MEDICO: 'MEDICO' as Seccion,
        INFORMACION: 'INFORMACION' as Seccion,
        TEST: 'TEST' as Seccion,
        ESTADISTICA: 'ESTADISTICA' as Seccion,
    }
}

export interface ICelularEstado {
    idCelularEstado?: number;
    celular?: string;
    fkVirus?: number;
    seccion?: _CelularEstado.Seccion;
    fk?: number;
}

export class CelularEstado extends BaseModel implements ICelularEstado {
    // Objection
    static tableName = 'CelularEstado';
    static idColumn = 'idCelularEstado';
    // Objection Modifiers
    static columnList = ['idCelularEstado', 'celular', 'fkVirus', 'seccion', 'fk'];

    // Columns
    idCelularEstado?: number;
    celular?: string;
    fkVirus?: number;
    seccion?: _CelularEstado.Seccion;
    fk?: number;

    //Relations: BelongsToOne
    virus: Virus;

    // Relations: HasMany

    // Constructor
    constructor(celularEstado?: any){
        super();
        if(celularEstado!==undefined){
            this.idCelularEstado = celularEstado.idCelularEstado;
            this.celular = celularEstado.celular;
            this.fkVirus = celularEstado.fkVirus;
            this.seccion = celularEstado.seccion;
            this.fk = celularEstado.fk;
        }
    }
    
    // Respond Object
    toJSON() {
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...CelularEstado.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation

        //------------------------------------- BelongsToOneRelation          
        Virus: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Virus',
            join: { from: 'CelularEstado.fkVirus', to: 'Virus.idVirus' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
