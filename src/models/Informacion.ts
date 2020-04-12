import { Virus } from './Virus';
import { CategoriaInformacion } from './CategoriaInformacion';
import { ContentTypeEnum, Defaults } from '../api/API';
import { SafeResourceUrl } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/compiled/core';

// tslint:disable-next-line:no-namespace
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

    // Relations: BelongsToOne
    virus: Virus;
    categoriaInformacion: CategoriaInformacion;

    // Relations: HasMany

    // Extras
    archivoImg: SafeResourceUrl;
    archivoPdf: string;
    archivoPdfZoom: number;
    archivoVideo: string;
    archivoVideoAPI: VgAPI;

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
            this.categoriaInformacion = new CategoriaInformacion(informacion.categoriaInformacion);
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idInformacion: this.idInformacion,
            fkVirus: this.fkVirus,
            fkCategoriaInformacion: this.fkCategoriaInformacion,
            texto: this.texto,
            descripcion: this.descripcion,
            mimetype: this.mimetype,
            archivo: this.archivo
        };
    }
}
