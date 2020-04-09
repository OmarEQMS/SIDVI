import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Virus, _Virus } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class VirusService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarVirus(clave?: string, nombre?: string, fkTestNodo?: number, estatus?: _Virus.Estatus, ordenarPor?: string,
                       ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (clave !== undefined && clave !== null) {
            queryParameters = queryParameters.set('clave', clave);
        }
        if (nombre !== undefined && nombre !== null) {
            queryParameters = queryParameters.set('nombre', nombre);
        }
        if (fkTestNodo !== undefined && fkTestNodo !== null) {
            queryParameters = queryParameters.set('fkTestNodo', fkTestNodo.toString());
        }
        if (estatus !== undefined && estatus !== null) {
            queryParameters = queryParameters.set('estatus', estatus);
        }
        if (ordenarPor !== undefined && ordenarPor !== null) {
            queryParameters = queryParameters.set('ordenarPor', ordenarPor);
        }
        if (ordenarModo !== undefined && ordenarModo !== null) {
            queryParameters = queryParameters.set('ordenarModo', ordenarModo);
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/virus`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearVirus(virus: Virus): Observable<any> {
        // Validate
        if (virus === null || virus === undefined) {
            throw new Error('Required parameter virus was null or undefined when calling crearVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/virus`,
            virus.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerVirus(idVirus: number): Observable<any> {
        // Validate
        if (idVirus === null || idVirus === undefined) {
            throw new Error('Required parameter idVirus was null or undefined when calling obtenerVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarVirus(idVirus: number, virus: Virus): Observable<any> {
        // Validate
        if (idVirus === null || idVirus === undefined) {
            throw new Error('Required parameter idVirus was null or undefined when calling actualizarVirus.');
        }
        if (virus === null || virus === undefined) {
            throw new Error('Required parameter virus was null or undefined when calling actualizarVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}`,
            virus.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarVirus(idVirus: number): Observable<any> {
        // Validate
        if (idVirus === null || idVirus === undefined) {
            throw new Error('Required parameter idVirus was null or undefined when calling eliminarVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public descargarVirusIcono(idVirus: number): Observable<any> {
        // Validate
        if (idVirus === null || idVirus === undefined) {
            throw new Error('Required parameter idVirus was null or undefined when calling descargarVirusIcono.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}/icono`,
            { responseType: 'blob', headers, observe: 'body', reportProgress: true }
        );
    }

    public urlVirusIcono(idVirus: number): string {
        return `${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}/icono` +
               `?TokenUsuario=${encodeURIComponent(this.manager.tokenUsuario)}`;
    }

    public cargarVirusIcono(idVirus: number, icono: Blob): Observable<any> {
        // Validate
        if (idVirus === null || idVirus === undefined) {
            throw new Error('Required parameter idVirus was null or undefined when calling cargarVirusIcono.');
        }
        if (icono === null || icono === undefined) {
            throw new Error('Required parameter icono was null or undefined when calling cargarVirusIcono.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // FormData
        const formParams = new FormData();
        if (icono !== undefined) {
            formParams.append('icono', icono);
        }

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/virus/${encodeURIComponent(String(idVirus))}/icono`,
            formParams, { headers, observe: 'body', reportProgress: true }
        );
    }

}
