import { RelationMappings, Model } from 'objection';

import { BaseModel, Virus, Ubicacion, CategoriaEstadistica } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

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

export class Estadistica extends BaseModel implements IEstadistica {
    // Objection
    static tableName = 'Estadistica';
    static idColumn = 'idEstadistica';
    // Objection Modifiers
    static columnList = ['idEstadistica', 'fkVirus', 'fkUbicacion', 'fkCategoriaEstadistica', 'valor', 'fecha'];

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
    constructor(estadistica?: any){
        super();
        if(estadistica!==undefined){
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
}
