import { RelationMappings, Model } from 'objection';

import { BaseModel, Informacion } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CategoriaInformacion {
    
}

export interface ICategoriaInformacion {
    idCategoriaInformacion?: number;
    clave?: string;
    nombre?: string;
}

export class CategoriaInformacion extends BaseModel implements ICategoriaInformacion {
    // Objection
    static tableName = 'CategoriaInformacion';
    static idColumn = 'idCategoriaInformacion';
    // Objection Modifiers
    static columnList = ['idCategoriaInformacion', 'clave', 'nombre'];

    // Columns
    idCategoriaInformacion?: number;
    clave?: string;
    nombre?: string;

    //Relations: BelongsToOne
    
    // Relations: HasMany
    informaciones: Informacion[];

    // Constructor
    constructor(categoriaInformacion?: any){
        super();
        if(categoriaInformacion!==undefined){
            this.idCategoriaInformacion = categoriaInformacion.idCategoriaInformacion;
            this.clave = categoriaInformacion.clave;
            this.nombre = categoriaInformacion.nombre;
        }
    }
}
