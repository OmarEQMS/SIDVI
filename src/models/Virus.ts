import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { TestNodo} from './TestNodo';
import { MedicoVirus} from './MedicoVirus';

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

export class Virus extends BaseModel implements IVirus {
    // Objection
    static tableName = 'Virus';
    static idColumn = 'idVirus';
    // Objection Modifiers
    static columnList = ['idVirus', 'clave', 'nombre', 'mimetypeIcono', 'fkTestNodo', 'estatus'];

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
    constructor(virus?: any){
        super();
        if(virus!==undefined){
            this.idVirus = virus.idVirus;
            this.clave = virus.dave;
            this.nombre = virus.nombre;
            this.mimetypeIcono = virus.mimetypeIcono;
            this.archivoIcono = virus.archivoIcono;
            this.fkTestNodo = virus.fkTestNodo;
        }
    }
}
