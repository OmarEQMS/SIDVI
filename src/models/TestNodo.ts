import { ContentTypeEnum, Defaults } from '../api';

import { Virus } from './Virus';
import { TestOpcion } from './TestOpcion';

// tslint:disable-next-line:no-namespace
export namespace _TestNodo {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.PDF, ContentTypeEnum.JPG, ContentTypeEnum.PNG, ContentTypeEnum.MP4];
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

export class TestNodo implements ITestNodo {
    // Columns
    idTestNodo?: number;
    fkVirus?: number;
    texto?: string;
    descripcion?: string;
    mimetype?: ContentTypeEnum;
    archivo?: ArrayBuffer | string;

    // Relations: BelongsToOne
    virus?: Virus;

    // Relations: HasMany
    testOpciones?: TestOpcion[];
    testOpcionesSig?: TestOpcion[];
    viruss?: Virus[];

    // Constructor
    constructor(testNodo?: any) {
        if (testNodo !== undefined) {
            this.idTestNodo = testNodo.idTestNodo;
            this.fkVirus = testNodo.fkVirus;
            this.texto = testNodo.texto;
            this.descripcion = testNodo.descripcion;
            this.mimetype = testNodo.mimetype;
            this.archivo = testNodo.archivo;
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idTestNodo: this.idTestNodo,
            fkVirus: this.fkVirus,
            texto: this.texto,
            descripcion: this.descripcion,
            mimetype: this.mimetype,
            archivo: this.archivo
        };
    }
}
