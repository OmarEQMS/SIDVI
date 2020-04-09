import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Informacion, _Informacion } from '../models/Informacion';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class InformacionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarInformaciones(fkVirus?: number, fkCategoriaInformacion?: number, texto?: string, ordenarPor?: string,
                               ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', fkVirus.toString());
        }
        if (fkCategoriaInformacion !== undefined && fkCategoriaInformacion !== null) {
            queryParameters = queryParameters.set('fkCategoriaInformacion', fkCategoriaInformacion.toString());
        }
        if (texto !== undefined && texto !== null) {
            queryParameters = queryParameters.set('texto', texto);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/informacion`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearInformacion(informacion: Informacion): Observable<any> {
        // Validate
        if (informacion === null || informacion === undefined) {
            throw new Error('Required parameter informacion was null or undefined when calling crearInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/informacion`,
            informacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerInformacion(idInformacion: number): Observable<any> {
        // Validate
        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling obtenerInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarInformacion(idInformacion: number, informacion: Informacion): Observable<any> {
        // Validate
        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling actualizarInformacion.');
        }
        if (informacion === null || informacion === undefined) {
            throw new Error('Required parameter informacion was null or undefined when calling actualizarInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            informacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarInformacion(idInformacion: number): Observable<any> {
        // Validate
        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling eliminarInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public descargarInformacionArchivo(idInformacion: number): Observable<any> {
        // Validate
        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling descargarInformacionArchivo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}/archivo`,
            { responseType: 'blob', headers, observe: 'body', reportProgress: true }
        );
    }

    public urlInformacionArchivo(idInformacion: number): string {
        return `${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}/archivo` +
               `?TokenUsuario=${encodeURIComponent(this.manager.tokenUsuario)}`;
    }

    public cargarInformacionArchivo(idInformacion: number, archivo: Blob): Observable<any> {
        // Validate
        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling cargarInformacionArchivo.');
        }
        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarInformacionArchivo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // FormParams
        const formParams = new FormData();
        if (archivo !== undefined) {
            formParams.append('archivo', archivo);
        }

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}/archivo`,
            formParams, { headers, observe: 'body', reportProgress: true }
        );
    }

}
