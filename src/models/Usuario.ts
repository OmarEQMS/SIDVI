import { ContentTypeEnum, Defaults } from '../api/API';

import { Medico } from './Medico';
import { Valoracion } from './Valoracion';

// tslint:disable-next-line:no-namespace
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

export class Usuario implements IUsuario {

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

    // Relations: BelongsToOne

    // Relations: HasMany
    medicos: Medico[];
    valoraciones?: Valoracion[];

    // Constructor
    constructor(usuario?: any) {
        if (usuario !== undefined) {
            this.idUsuario = usuario.idUsuario;
            this.nombreCompleto = usuario.nombreCompleto;
            this.usuario = usuario.usuario;
            this.contrasena = usuario.contrasena;
            this.token = usuario.token;
            this.correo = usuario.correo;
            this.celular = usuario.celular;
            this.mimetypeFoto = usuario.mimetypeFoto;
            this.archivoFoto = usuario.archivoFoto;
            this.rol = usuario.rol;
        }
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idUsuario: this.idUsuario,
            nombreCompleto: this.nombreCompleto,
            usuario: this.usuario,
            contrasena: this.contrasena,
            token: this.token,
            correo: this.correo,
            celular: this.celular,
            mimetypeFoto: this.mimetypeFoto,
            archivoFoto: this.archivoFoto,
            rol: this.rol
        };
    }
}
