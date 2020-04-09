 

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

export class CategoriaEstadistica implements ICategoriaEstadistica {
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
         
        if(categoriaEstadistica!==undefined){
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;
        }
    }
}
