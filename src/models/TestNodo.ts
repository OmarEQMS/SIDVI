import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Virus} from './Virus';
import { TestOpcion} from './TestOpcion';

export namespace _TestNodo {
export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.PDF,ContentTypeEnum.JPG,ContentTypeEnum.PNG,ContentTypeEnum.MP4];
export let archivoFileSize: number = 128 * 1024 * 1024;

}

export interface ITestNodo {
    idTestNodo?: number;
    fkVirus?: number;
    texto?: string;
    descripcion?: string;
    mimetype?: string;
    archivo?: ArrayBuffer | string;

}

export class TestNodo extends BaseModel implements ITestNodo {
    // Objection
    static tableName = 'TestNodo';
    static idColumn = 'idTestNodo';
    // Objection Modifiers
    static columnList = ['idTestNodo', 'fkVirus', 'texto', 'descripcion', 'mimetype'];

    // Columns
    idTestNodo?: number;
    fkVirus?: number;
    texto?: string;
    descripcion?: string;
    mimetype?: ContentTypeEnum;
    archivo?: ArrayBuffer | string;

    //Relations: BelongsToOne
    virus?: Virus;

    // Relations: HasMany
    testOpciones?: TestOpcion[];
    testOpcionesSig?: TestOpcion[];
    viruss?: Virus[];
    
    // Constructor
    constructor(testNodo?: any){
        super();
        if(testNodo!==undefined){
            this.idTestNodo = testNodo.idTestNodo;
            this.fkVirus = testNodo.fkVirus;
            this.texto = testNodo.texto;
            this.descripcion = testNodo.descripcion;
            this.mimetype = testNodo.mimetype;
            this.archivo = testNodo.archivo;
        }
    }
}
