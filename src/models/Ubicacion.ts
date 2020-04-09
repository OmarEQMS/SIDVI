import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico } from './Medico';

export namespace _Ubicacion {
    
}

export interface IUbicacion {
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;
}

export class Ubicacion extends BaseModel implements IUbicacion {
    // Objection
    static tableName = 'Ubicacion';
    static idColumn = 'idUbicacion';
    // Objection Modifiers
    static columnList = ['idUbicacion', 'fkUbicacion', 'clave', 'nombre'];

    // Columns
    idUbicacion?: number;
    fkUbicacion?: number;
    clave?: string;
    nombre?: string;

    //Relations: BelongsToOne
    ubicacion?: Ubicacion;
    // Relations: HasMany
    ubicaciones?: Ubicacion[];
    medicos?: Medico[];

    // Constructor
    constructor(ubicacion?: any){
        super();
        if(ubicacion!==undefined){
            this.idUbicacion = ubicacion.idUbicacion;
            this.fkUbicacion = ubicacion.fkUbicacion;
            this.clave = ubicacion.dave;
            this.nombre = ubicacion.nombre;
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
                builder.select(...Ubicacion.columnList);
            }
        };
    }
    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation
        Ubicaciones: {
            relation: Model.HasManyRelation,
            modelClass: 'Ubicacion',
            join: { from: 'Ubicacion.idUbicacion', to: 'Ubicacion.fkUbicacion' }
        },
        Medico: {
            relation: Model.HasManyRelation,
            modelClass: 'Medico',
            join: { from: 'Ubicacion.idUbicacion', to: 'Medico.fkUbicacion' }
        },

        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  
        Ubicacion: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Ubicacion',
            join: { from: 'Ubicacion.fkUbicacion', to: 'Ubicacion.idUbicacion' }
        }
        //------------------------------------- HasOneThroughRelation
    };

}
