import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Usuario} from './Usuario';
import { Ubicacion} from './Ubicacion';
import { MedicoVirus} from './MedicoVirus';
import { Valoracion} from './Valoracion';

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
    archivoFoto ?: ArrayBuffer | string; 

}   

export class Medico extends BaseModel implements IMedico {
    // Objection
    static tableName = 'Medico';
    static idColumn = 'idMedico';
    // Objection Modifiers
    static columnList = ['idMedico', 'fkUsuario', 'fkUbicacion', 'nombreConsultorio', 'nombreDoctor', 'direccionConsultorio', 'telefonoConsultorio', 'descripcion', 'mimetypeFoto'];

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
    archivoFoto ?: ArrayBuffer | string; 

    //Relations: BelongsToOne
    usuario?: Usuario;
    ubicacion?: Ubicacion;
    
    // Relations: HasMany
    medicosVirus?: MedicoVirus[];
    valoraciones?: Valoracion[];
    // Constructor
    constructor(medico?: any){
        super();
        if(medico!==undefined){
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
}
