import { ContentTypeEnum, Defaults } from '../api/API';

import { TestNodo } from './TestNodo';
import { SafeResourceUrl } from '@angular/platform-browser';

// tslint:disable-next-line:no-namespace
export namespace _TestOpcion {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.PDF, ContentTypeEnum.JPG, ContentTypeEnum.PNG, ContentTypeEnum.MP4];
    export let archivoFileSize: number = 128 * 1024 * 1024;
}

export interface ITestOpcion {
    idTestOpcion?: number;
    fkTestNodo?: number;
    fkTestNodoSig?: number;
    clave?: string;
    texto?: string;
    descripcion?: string;
    mimetype?: string;
    archivo?: ArrayBuffer | string;
}

export class TestOpcion implements ITestOpcion {

    // Columns
    idTestOpcion?: number;
    fkTestNodo?: number;
    fkTestNodoSig?: number;
    clave?: string;
    texto?: string;
    descripcion?: string;
    mimetype?: ContentTypeEnum;
    archivo?: ArrayBuffer | string;

    // Relations: BelongsToOne
    testNodo?: TestNodo;
    testNodoSig?: TestNodo;

    // Relations: HasMany

    // Extras
    archivoImg: SafeResourceUrl;
    localFile: FileList;
    localFileName: string;

    // Constructor
    constructor(testOpcion?: any) {
        if (testOpcion !== undefined) {
            this.idTestOpcion = testOpcion.idTestOpcion;
            this.fkTestNodo = testOpcion.fkTestNodo;
            this.fkTestNodoSig = testOpcion.fkTestNodoSig;
            this.clave = testOpcion.clave;
            this.texto = testOpcion.texto;
            this.descripcion = testOpcion.descripcion;
            this.mimetype = testOpcion.mimetype;
            this.archivo = testOpcion.archivo;
        }
        this.localFileName = 'Choose file';

    }

    // ToObjectDB
    toObjectDB() {
        return {
            idTestOpcion: this.idTestOpcion,
            fkTestNodo: this.fkTestNodo,
            fkTestNodoSig: this.fkTestNodoSig,
            clave: this.clave,
            texto: this.texto,
            descripcion: this.descripcion,
            mimetype: this.mimetype
            // archivo: this.archivo
        };
    }
}
