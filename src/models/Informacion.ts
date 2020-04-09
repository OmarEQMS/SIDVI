import { RelationMappings, Model } from 'objection';

import { BaseModel, Virus, CategoriaInformacion } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Informacion {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;
}

export interface IInformacion {
    idInformacion?: number;
    fkVirus?: number;
    fkCategoriaInformacion?: number;
    texto?: string;
    descripcion?: string;
    mimetype?: string;
    archivo?: ArrayBuffer | string;
}

export class Informacion extends BaseModel implements IInformacion {
    // Objection
    static tableName = 'Informacion';
    static idColumn = 'idInformacion';
    // Objection Modifiers
    static columnList = ['idInformacion', 'fkVirus', 'fkCategoriaInformacion', 'texto', 'descripcion', 'mimetype'];

    // Columns
    idInformacion?: number;
    fkVirus?: number;
    fkCategoriaInformacion?: number;
    texto?: string;
    descripcion?: string;
    mimetype?: ContentTypeEnum;
    archivo?: ArrayBuffer | string;

    //Relations: BelongsToOne
    virus: Virus;
    categoriaInformacion: CategoriaInformacion;

    // Relations: HasMany

    // Constructor
    constructor(informacion?: any) {
        super();
        if (informacion !== undefined) {
            this.idInformacion = informacion.idInformacion;
            this.fkVirus =  informacion.fkVirus;
            this.fkCategoriaInformacion =  informacion.fkCategoriaInformacion;
            this.texto =  informacion.texto;
            this.descripcion =  informacion.descripcion;
            this.mimetype =  informacion.mimetype;
            this.archivo = informacion.archivo;
            // Relations
            this.categoriaInformacion = new CategoriaInformacion(informacion.CategoriaInformacion);
        }
    }

    // Respond Object
    toJSON() {
        if(this.archivo != null && Defaults.allowBase64Types.includes(this.mimetype)) {
            this.archivo = fileToBase64(this.mimetype, this.archivo);
        } else {
            delete this.archivo;
        }
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {
            defaultSelect(builder) {
                builder.select(...Informacion.columnList);
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
            join: { from: 'Informacion.fkVirus', to: 'Virus.idVirus' }
        },
        CategoriaInformacion: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'CategoriaInformacion',
            join: { from: 'Informacion.fkCategoriaInformacion', to: 'CategoriaInformacion.idCategoriaInformacion' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
