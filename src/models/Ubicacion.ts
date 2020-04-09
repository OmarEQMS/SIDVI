 

 
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

export class Ubicacion implements IUbicacion {
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
         
        if(ubicacion!==undefined){
            this.idUbicacion = ubicacion.idUbicacion;
            this.fkUbicacion = ubicacion.fkUbicacion;
            this.clave = ubicacion.dave;
            this.nombre = ubicacion.nombre;
        }
    }
}
