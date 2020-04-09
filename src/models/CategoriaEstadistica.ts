import { RelationMappings, Model } from 'objection';

import { BaseModel, Estadistica } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CategoriaEstadistica {
    
}

export interface ICategoriaEstadistica {
    idCategoriaEstadistica?: number;
    nombre?: string;
}

export class CategoriaEstadistica extends BaseModel implements ICategoriaEstadistica {
    // Objection
    static tableName = 'CategoriaEstadistica';
    static idColumn = 'idCategoriaEstadistica';
    // Objection Modifiers
    static columnList = ['idCategoriaEstadistica', 'nombre'];

    // Columns
    idCategoriaEstadistica?: number;
    nombre?: string;

    //Relations: BelongsToOne
    
    // Relations: HasMany
    estadisticas: Estadistica[];

    // Constructor
    constructor(categoriaEstadistica?: any){
        super();
        if(categoriaEstadistica!==undefined){
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;
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
                builder.select(...CategoriaEstadistica.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation
        Estadistica: {
            relation: Model.HasManyRelation,
            modelClass: 'Estadistica',
            join: { from: 'CategoriaEstadistica.idCategoriaEstadistica', to: 'Estadistica.fkCategoriaEstadistica' }
        }

        //------------------------------------- HasOneRelation
        
        //------------------------------------- BelongsToOneRelation  

        //------------------------------------- HasOneThroughRelation
    };

}
