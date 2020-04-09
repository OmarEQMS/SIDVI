import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico } from './Medico';
import { Valoracion} from './Valoracion';

export namespace _Usuario {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;

    export type Rol = 'USUARIO' | 'ADMINISTRADOR';
    export const Rol = {
        USUARIO: 'USUARIO' as Rol,
        ADMINISTRADOR: 'ADMINISTRADOR' as Rol
    };
}

export interface IUsuario {
    idUsuario?: number;
    nombreCompleto: string;
    usuario?: string;
    contrasena?: string;
    token?: string;
    correo?: string;
    celular?: string;
    mimetypeFoto?: string;
    archivoFoto?: ArrayBuffer | string;
    rol?: _Usuario.Rol;
}

export class Usuario extends BaseModel implements IUsuario {
    // Objection
    static tableName = 'Usuario';
    static idColumn = 'idUsuario';
    // Objection Modifiers
    static columnList = ['idUsuario', 'nombreCompleto', 'usuario', 'correo', 'celular', 'mimetypeFoto', 'rol'];
    static columnListAuthorization = ['idUsuario', 'nombreCompleto', 'usuario', 'contrasena', 'token', 'rol'];

    // Columns
    idUsuario?: number;
    nombreCompleto: string;
    usuario?: string;
    contrasena?: string;
    token?: string;
    correo?: string;
    celular?: string;
    mimetypeFoto?: ContentTypeEnum;
    archivoFoto?: ArrayBuffer | string;
    rol?: _Usuario.Rol;

    //Relations: BelongsToOne
    
    // Relations: HasMany
    medicos: Medico[];
    valoraciones?: Valoracion[];

    // Constructor
    constructor(usuario?: any){
        super();
        if(usuario!==undefined){
            this.idUsuario = usuario.idUsuario;
            this.nombreCompleto = usuario.nombreCompleto;
            this.usuario = usuario.usuario;
            this.contrasena = usuario.contrasena;
            this.token = usuario.token
            this.correo = usuario.correo;
            this.celular = usuario.celular;
            this.mimetypeFoto = usuario.mimetypeFoto;
            this.archivoFoto = usuario.archivoFoto;
            this.rol = usuario.rol;
        }
    }
    
    // Respond Object
    toJSON() {
        delete this.contrasena;
        delete this.token;
        if (this.archivoFoto!=null && Defaults.allowBase64Types.includes(this.mimetypeFoto)) {
            this.archivoFoto = fileToBase64(this.mimetypeFoto, this.archivoFoto);
        }else{
            delete this.archivoFoto;
        }
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...Usuario.columnList);
            },
            authorizationSelect(builder) {
                builder.select(...Usuario.columnListAuthorization);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation
        Medico: {
            relation: Model.HasManyRelation,
            modelClass: 'Medico',
            join: { from: 'Usuario.idUsuario', to: 'Medico.fkUsuario' }
        },
        Valoracion: {
            relation: Model.HasManyRelation,
            modelClass: 'Valoracion',
            join: { from: 'Usuario.idUsuario', to: 'Valoracion.fkUsuario' }
        }
        
        //------------------------------------- HasOneRelation

        //------------------------------------- BelongsToOneRelation 
         

        //------------------------------------- HasOneThroughRelation
    };

}
