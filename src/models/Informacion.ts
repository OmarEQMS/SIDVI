import { Virus } from './Virus';
import { CategoriaInformacion } from './CategoriaInformacion';
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

export class Informacion implements IInformacion {

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
        if (informacion !== undefined) {
            this.idInformacion = informacion.idInformacion;
            this.fkVirus = informacion.fkVirus;
            this.fkCategoriaInformacion = informacion.fkCategoriaInformacion;
            this.texto = informacion.texto;
            this.descripcion = informacion.descripcion;
            this.mimetype = informacion.mimetype;
            this.archivo = informacion.archivo;
            // Relations
            this.categoriaInformacion = new CategoriaInformacion(informacion.CategoriaInformacion);
        }
    }
}
