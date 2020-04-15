import { ContentTypeEnum, Defaults } from '../api/API';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Usuario } from './Usuario';
import { Ubicacion } from './Ubicacion';
import { MedicoVirus } from './MedicoVirus';
import { Valoracion } from './Valoracion';

// tslint:disable-next-line:no-namespace
export namespace _Medico {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;

}

export interface IMedico {
    idMedico?: number;
    fkUsuario?: number;
    fkUbicacion?: number;
    nombreConsultorio?: string;
    nombreDoctor?: string;
    direccionConsultorio?: string;
    telefonoConsultorio?: string;
    descripcion?: string;
    mimetypeFoto?: string;
    archivoFoto?: ArrayBuffer | string;
}

export class Medico implements IMedico {

    // Columns
    idMedico?: number;
    fkUsuario?: number;
    fkUbicacion?: number;
    nombreConsultorio?: string;
    nombreDoctor?: string;
    direccionConsultorio?: string;
    telefonoConsultorio?: string;
    descripcion?: string;
    mimetypeFoto?: ContentTypeEnum;
    archivoFoto?: ArrayBuffer | string;

    // Relations: BelongsToOne
    usuario?: Usuario;
    ubicacion?: Ubicacion;

    // Relations: HasMany
    medicosVirus?: MedicoVirus[];
    valoraciones?: Valoracion[];

    // Extras
    archivoIconoImg: SafeResourceUrl;

    // Constructor
    constructor(medico?: any) {
        if (medico !== undefined) {
            this.idMedico = medico.idMedico;
            this.fkUsuario = medico.fkUsuario;
            this.fkUbicacion = medico.fkUbicacion;
            this.nombreConsultorio = medico.nombreConsultorio;
            this.nombreDoctor = medico.nombreDoctor;
            this.direccionConsultorio = medico.direccionConsultorio;
            this.telefonoConsultorio = medico.telefonoConsultorio;
            this.descripcion = medico.descripcion;
            this.mimetypeFoto = medico.mimetypeFoto;
            this.archivoFoto = medico.archivoFoto;

        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idMedico: this.idMedico,
            fkUsuario: this.fkUsuario,
            fkUbicacion: this.fkUbicacion,
            nombreConsultorio: this.nombreConsultorio,
            nombreDoctor: this.nombreDoctor,
            direccionConsultorio: this.direccionConsultorio,
            telefonoConsultorio: this.telefonoConsultorio,
            descripcion: this.descripcion,
            mimetypeFoto: this.mimetypeFoto,
            archivoFoto: this.archivoFoto
        };
    }
}
