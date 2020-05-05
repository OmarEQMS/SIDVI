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
    updateUser = new Subject<number>();

    constructor() {
        this.getTokenItems();
    }

    setItems(tokenUsuario: string, usuario: Usuario) {
        this.tokenUsuario = tokenUsuario;
        this.usuario = new Usuario(usuario);
        localStorage.setItem('sidvi-tokenUsuario', tokenUsuario);
        localStorage.setItem('sidvi-usuario', JSON.stringify(usuario));
    }
    unsetItems() {
        this.tokenUsuario = null;
        this.usuario = null;
        localStorage.setItem('sidvi-tokenUsuario', null);
        localStorage.setItem('sidvi-usuario', null);
    }
    getTokenItems() {
        try {
            this.tokenUsuario = localStorage.getItem('sidvi-tokenUsuario');
            this.usuario = JSON.parse(localStorage.getItem('sidvi-usuario'));
            if (this.tokenUsuario === 'null' || this.usuario as any === 'null') {
                this.unsetItems();
            }
        } catch {
            this.unsetItems();
        }
    }


    errorHandler(apiResponse: APIResponse): boolean {
        return false;
    }

}
