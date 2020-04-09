import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { TestNodo } from './TestNodo';

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

    //Relations: BelongsToOne
    testNodo?: TestNodo;
    testNodoSig?: TestNodo;
    // Relations: HasMany

    // Constructor
    constructor(testOpcion?: any) {
        if (testOpcion !== undefined) {
            this.idTestOpcion = testOpcion.idTestOpcion;
            this.fkTestNodo = testOpcion.fkTestNodo;
            this.fkTestNodoSig = testOpcion.fkTestNodoSig;
            this.clave = testOpcion.dave;
            this.texto = testOpcion.texto;
            this.descripcion = testOpcion.descripcion;
            this.mimetype = testOpcion.mimetype;
            this.archivo = testOpcion.archivo;
        }
    }
}
