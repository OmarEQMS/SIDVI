import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { SubcategoriaEstadistica, _SubcategoriaEstadistica } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class SubcategoriaEstadisticaService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarSubcategoriaEstadistica(fkCategoriaEstadistica?: number, nombre?: string, ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkCategoriaEstadistica !== undefined && fkCategoriaEstadistica !== null) {
            queryParameters = queryParameters.set('fkCategoriaEstadistica', fkCategoriaEstadistica.toString());
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
        return this.httpClient.get<any>(`${this.manager.basePath}/subcategoriaEstadistica`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearSubcategoriaEstadistica(subcategoriaEstadistica: SubcategoriaEstadistica): Observable<any> {
        // Validate
        if (subcategoriaEstadistica === null || subcategoriaEstadistica === undefined) {
            throw new Error('Required parameter subcategoriaEstadistica was null or undefined when calling crearSubcategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/subcategoriaEstadistica`,
            subcategoriaEstadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerSubcategoriaEstadistica(idSubcategoriaEstadistica: number): Observable<any> {
        // Validate
        if (idSubcategoriaEstadistica === null || idSubcategoriaEstadistica === undefined) {
            throw new Error('Required parameter idSubcategoriaEstadistica was null or undefined when calling obtenerSubcategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/subcategoriaEstadistica/
                                         ${encodeURIComponent(String(idSubcategoriaEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarSubcategoriaEstadistica(idSubcategoriaEstadistica: number, subcategoriaEstadistica: SubcategoriaEstadistica): Observable<any> {
        // Validate
        if (idSubcategoriaEstadistica === null || idSubcategoriaEstadistica === undefined) {
            throw new Error('Required parameter idSubcategoriaEstadistica was null or undefined when calling actualizarSubcategoriaEstadistica.');
        }
        if (subcategoriaEstadistica === null || subcategoriaEstadistica === undefined) {
            throw new Error('Required parameter subcategoriaEstadistica was null or undefined when calling actualizarSubcategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/subcategoriaEstadistica/
                                                 ${encodeURIComponent(String(idSubcategoriaEstadistica))}`,
            subcategoriaEstadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarSubcategoriaEstadistica(idSubcategoriaEstadistica: number): Observable<any> {
        // Validate
        if (idSubcategoriaEstadistica === null || idSubcategoriaEstadistica === undefined) {
            throw new Error('Required parameter idSubcategoriaEstadistica was null or undefined when calling eliminarSubcategoriaEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/subcategoriaEstadistica/
                                                    ${encodeURIComponent(String(idSubcategoriaEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
