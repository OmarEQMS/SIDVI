import { Injectable } from '@angular/core';
import { Usuario } from '../models';
import { Subject } from 'rxjs';
import { APIResponse } from './APIResponse';

export class Inputs {
    idUsuario: Subject<number>;

    IdUsuario: number;

    constructor() {
        this.idUsuario = new Subject<number>();

        this.idUsuario.subscribe(id => { this.IdUsuario = id; });
    }
}

@Injectable()
export class ManagerService {
    basePath: string;
    tokenUsuario: string;
    usuario: Usuario;

    inputs: Inputs = new Inputs();
    updateMain = new Subject<number>();

    constructor() {
        this.getTokenItems();
    }

    setItems(tokenUsuario: string, usuario: Usuario) {
        this.tokenUsuario = tokenUsuario;
        this.usuario = usuario;
        localStorage.setItem('tokenUsuario', tokenUsuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    unsetItems() {
        this.tokenUsuario = null;
        this.usuario = null;
        localStorage.setItem('tokenUsuario', null);
        localStorage.setItem('usuario', null);
    }
    getTokenItems() {
        this.tokenUsuario = localStorage.getItem('tokenUsuario');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }


    errorHandler(apiResponse: APIResponse): boolean {
        return false;
    }

}
