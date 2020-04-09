import { Informacion } from './Informacion';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CategoriaInformacion {

}

export interface ICategoriaInformacion {
    idCategoriaInformacion?: number;
    clave?: string;
    nombre?: string;
}

export class CategoriaInformacion implements ICategoriaInformacion {
    
    // Columns
    idCategoriaInformacion?: number;
    clave?: string;
    nombre?: string;

    //Relations: BelongsToOne

    // Relations: HasMany
    informaciones: Informacion[];

    // Constructor
    constructor(categoriaInformacion?: any) {
        if (categoriaInformacion !== undefined) {
            this.idCategoriaInformacion = categoriaInformacion.idCategoriaInformacion;
            this.clave = categoriaInformacion.clave;
            this.nombre = categoriaInformacion.nombre;
        }
    }
}
