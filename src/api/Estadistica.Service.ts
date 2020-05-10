import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Estadistica, _Estadistica } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class EstadisticaService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarEstadisticas(fkVirus?: number, fkUbicacion?: number, fkSubcategoriaEstadistica1?: number, fkSubcategoriaEstadistica2?: number,
                              fkCategoriaEstadistica1?: number, fkCategoriaEstadistica2?: number, fechaInicio?: string, fechaFin?: string, ordenarPor?: string,
                              ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', fkVirus.toString());
        }
        if (fkUbicacion !== undefined && fkUbicacion !== null) {
            queryParameters = queryParameters.set('fkUbicacion', fkUbicacion.toString());
        }
        if (fkSubcategoriaEstadistica1 !== undefined && fkSubcategoriaEstadistica1 !== null) {
            queryParameters = queryParameters.set('fkSubcategoriaEstadistica1', fkSubcategoriaEstadistica1.toString());
        }
        if (fkSubcategoriaEstadistica2 !== undefined && fkSubcategoriaEstadistica2 !== null) {
            queryParameters = queryParameters.set('fkSubcategoriaEstadistica2', fkSubcategoriaEstadistica2.toString());
        }
        if (fkCategoriaEstadistica1 !== undefined && fkCategoriaEstadistica1 !== null) {
            queryParameters = queryParameters.set('fkCategoriaEstadistica1', fkCategoriaEstadistica1.toString());
        }
        if (fkCategoriaEstadistica2 !== undefined && fkCategoriaEstadistica2 !== null) {
            queryParameters = queryParameters.set('fkCategoriaEstadistica2', fkCategoriaEstadistica2.toString());
        }
        if (fechaInicio !== undefined && fechaInicio !== null) {
            queryParameters = queryParameters.set('fechaInicio', fechaInicio);
        }
        if (fechaFin !== undefined && fechaFin !== null) {
            queryParameters = queryParameters.set('fechaFin', fechaFin);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/estadistica`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarEstadistica(idEstadistica: number, estadistica: Estadistica): Observable<any> {
        // Validate
        if (idEstadistica === null || idEstadistica === undefined) {
            throw new Error('Required parameter idEstadistica was null or undefined when calling actualizarEstadistica.');
        }
        if (estadistica === null || estadistica === undefined) {
            throw new Error('Required parameter estadistica was null or undefined when calling actualizarEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/estadistica/${encodeURIComponent(String(idEstadistica))}`,
            estadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public crearEstadistica(estadistica: Estadistica): Observable<any> {
        // Validate
        if (estadistica === null || estadistica === undefined) {
            throw new Error('Required parameter estadistica was null or undefined when calling crearEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/estadistica`,
            estadistica.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarEstadistica(idEstadistica: number): Observable<any> {
        // Validate
        if (idEstadistica === null || idEstadistica === undefined) {
            throw new Error('Required parameter idEstadistica was null or undefined when calling eliminarEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/estadistica/${encodeURIComponent(String(idEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerEstadistica(idEstadistica: number): Observable<any> {
        // Validate
        if (idEstadistica === null || idEstadistica === undefined) {
            throw new Error('Required parameter idEstadistica was null or undefined when calling obtenerEstadistica.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/estadistica/${encodeURIComponent(String(idEstadistica))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
