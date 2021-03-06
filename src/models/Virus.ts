import { ContentTypeEnum, Defaults } from '../api/API';
import { TestNodo } from './TestNodo';
import { MedicoVirus } from './MedicoVirus';
import { VgAPI } from 'videogular2/compiled/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Informacion } from './Informacion';

// tslint:disable-next-line:no-namespace
export namespace _Virus {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;

    export type Estatus = 'INHABILITADO' | 'HABILITADO';
    export const Estatus = {
        INHABILITADO: 'INHABILITADO' as Estatus,
        HABILITADO: 'HABILITADO' as Estatus
    };

}

export interface IVirus {
    idVirus?: number;
    clave?: string;
    nombre?: string;
    mimetypeIcono?: string;
    archivoIcono?: ArrayBuffer | string;
    fkTestNodo?: number;
    estatus?: _Virus.Estatus;
}

export class Virus implements IVirus {
    // Columns
    idVirus?: number;
    clave?: string;
    nombre?: string;
    mimetypeIcono?: ContentTypeEnum;
    archivoIcono?: ArrayBuffer | string;
    fkTestNodo?: number;
    estatus?: _Virus.Estatus;

    // Relations: BelongsToOne
    testNodo?: TestNodo;

    // Relations: HasMany
    medicosVirus?: MedicoVirus[];
    testNodos?: TestNodo[];
    informaciones?: Informacion[];

    // Extras
    archivoIconoImg: SafeResourceUrl;
    selected?: boolean;
    medicoVirusId?: number;

    // Local
    localFile: FileList;
    localFileName: string;

    // Constructor
    constructor(virus?: any) {
        this.selected = false;
        if (virus !== undefined) {
            this.idVirus = virus.idVirus;
            this.clave = virus. clave;
            this.nombre = virus.nombre;
            this.mimetypeIcono = virus.mimetypeIcono;
            this.archivoIcono = virus.archivoIcono;
            this.fkTestNodo = virus.fkTestNodo;
            this.selected = (virus.selected !== undefined) ? virus.selected : false;
            // Relations
            this.informaciones = new Array(0);
            this.localFileName = 'Seleccione una nueva imagen';
       }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idVirus: this.idVirus,
            clave: this.clave,
            nombre: this.nombre,
            mimetypeIcono: this.mimetypeIcono,
            fkTestNodo: this.fkTestNodo
        };
    }
}
