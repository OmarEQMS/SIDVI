import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { CategoriaEstadistica, _CategoriaEstadistica } from '../models/CategoriaEstadistica';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class CategoriaEstadisticaService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarCategoriasEstadistica(nombre?: string, ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
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
        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaEstadistica`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearCategoriaEstadistica(categoriaEstadistica: CategoriaEstadistica): Observable<any> {
        // Validate
        if (categoriaEstadistica === null || categoriaEstadistica === undefined) {
            throw new Error('Required parameter categoriaEstadistica was null or undefined when calling crearCategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/categoriaEstadistica`,
            categoriaEstadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerCategoriaEstadistica(idCategoriaEstadistica: number): Observable<any> {
        // Validate
        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling obtenerCategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaEstadistica/
                                         ${encodeURIComponent(String(idCategoriaEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarCategoriaEstadistica(idCategoriaEstadistica: number, categoriaEstadistica: CategoriaEstadistica): Observable<any> {
        // Validate
        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling actualizarCategoriaEstadistica.');
        }
        if (categoriaEstadistica === null || categoriaEstadistica === undefined) {
            throw new Error('Required parameter categoriaEstadistica was null or undefined when calling actualizarCategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/categoriaEstadistica/
                                                 ${encodeURIComponent(String(idCategoriaEstadistica))}`,
            categoriaEstadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarCategoriaEstadistica(idCategoriaEstadistica: number): Observable<any> {
        // Validate
        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling eliminarCategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/categoriaEstadistica/
                                                    ${encodeURIComponent(String(idCategoriaEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
