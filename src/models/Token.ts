import { Usuario, _Usuario } from "./Usuario";
import { getDate } from "../tools/Utils";

export interface IToken {
    idUsuario?: number;
    nombreCompleto: string;
    usuario: string;
    rol?: _Usuario.Rol;
    expire: Date;
}
export class Token implements IToken {
    idUsuario?: number;
    nombreCompleto: string;
    usuario: string;
    rol?: _Usuario.Rol;
    expire: Date;

    constructor(usuario: Usuario){
        this.idUsuario = usuario.idUsuario;
        this.nombreCompleto = usuario.nombreCompleto;
        this.usuario = usuario.usuario;
        this.rol = usuario.rol;
        this.expire = getDate();
    }
}