import { ContentTypeEnum, Defaults } from '../api';
import { TestNodo } from './TestNodo';
import { MedicoVirus } from './MedicoVirus';

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

    //Relations: BelongsToOne
    testNodo?: TestNodo;

    // Relations: HasMany
    medicosVirus?: MedicoVirus[];
    testNodos?: TestNodo[];

    // Constructor
    constructor(virus?: any) {
        if (virus !== undefined) {
            this.idVirus = virus.idVirus;
            this.clave = virus.dave;
            this.nombre = virus.nombre;
            this.mimetypeIcono = virus.mimetypeIcono;
            this.archivoIcono = virus.archivoIcono;
            this.fkTestNodo = virus.fkTestNodo;
        }
    }

    //ToObjectDB
    toObjectDB(){
        return {
            idVirus: this.idVirus,
            clave: this.clave,
            nombre: this.nombre,
            mimetypeIcono: this.mimetypeIcono,
            archivoIcono: this.archivoIcono,
            fkTestNodo: this.fkTestNodo
        }
    }
}
