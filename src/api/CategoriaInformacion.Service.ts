import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { CategoriaInformacion, _CategoriaInformacion } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class CategoriaInformacionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarCategoriasInformacion(clave?: string, nombre?: string, ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (clave !== undefined && clave !== null) {
            queryParameters = queryParameters.set('clave', clave);
        }
        if (nombre !== undefined && nombre !== null) {
            queryParameters = queryParameters.set('nombre', nombre);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaInformacion`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearCategoriaInformacion(categoriaInformacion: CategoriaInformacion): Observable<any> {
        // Validate
        if (categoriaInformacion === null || categoriaInformacion === undefined) {
            throw new Error('Required parameter categoriaInformacion was null or undefined when calling crearCategoriaInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/categoriaInformacion`,
            categoriaInformacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerCategoriaInformacion(idCategoriaInformacion: number): Observable<any> {
        // Validate
        if (idCategoriaInformacion === null || idCategoriaInformacion === undefined) {
            throw new Error('Required parameter idCategoriaInformacion was null or undefined when calling obtenerCategoriaInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaInformacion/${encodeURIComponent(String(idCategoriaInformacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarCategoriaInformacion(idCategoriaInformacion: number, categoriaInformacion: CategoriaInformacion): Observable<any> {
        // Validate
        if (idCategoriaInformacion === null || idCategoriaInformacion === undefined) {
            throw new Error('Required parameter idCategoriaInformacion was null or undefined when calling actualizarCategoriaInformacion.');
        }
        if (categoriaInformacion === null || categoriaInformacion === undefined) {
            throw new Error('Required parameter categoriaInformacion was null or undefined when calling actualizarCategoriaInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/categoriaInformacion/
                                                 ${encodeURIComponent(String(idCategoriaInformacion))}`,
            categoriaInformacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarCategoriaInformacion(idCategoriaInformacion: number): Observable<any> {
        // Validate
        if (idCategoriaInformacion === null || idCategoriaInformacion === undefined) {
            throw new Error('Required parameter idCategoriaInformacion was null or undefined when calling eliminarCategoriaInformacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/categoriaInformacion/
                                                    ${encodeURIComponent(String(idCategoriaInformacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
