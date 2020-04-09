import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Valoracion, _Valoracion } from '../models/Valoracion';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class ValoracionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarValoraciones(fkMedicoVirus?: number, fkUsuario?: number, ordenarPor?: string, ordenarModo?: OrderModeEnum):
                              Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkMedicoVirus !== undefined && fkMedicoVirus !== null) {
            queryParameters = queryParameters.set('fkMedicoVirus', fkMedicoVirus.toString());
        }
        if (fkUsuario !== undefined && fkUsuario !== null) {
            queryParameters = queryParameters.set('fkUsuario', fkUsuario.toString());
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
        return this.httpClient.get<any>(`${this.manager.basePath}/valoracion`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearValoracion(valoracion: Valoracion): Observable<any> {
        // Validate
        if (valoracion === null || valoracion === undefined) {
            throw new Error('Required parameter valoracion was null or undefined when calling crearValoracion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/valoracion`,
            valoracion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerValoracion(idValoracion: number): Observable<any> {
        // Validate
        if (idValoracion === null || idValoracion === undefined) {
            throw new Error('Required parameter idValoracion was null or undefined when calling obtenerValoracion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/valoracion/${encodeURIComponent(String(idValoracion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarValoracion(idValoracion: number, valoracion: Valoracion): Observable<any> {
        // Validate
        if (idValoracion === null || idValoracion === undefined) {
            throw new Error('Required parameter idValoracion was null or undefined when calling actualizarValoracion.');
        }
        if (valoracion === null || valoracion === undefined) {
            throw new Error('Required parameter valoracion was null or undefined when calling actualizarValoracion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/valoracion/${encodeURIComponent(String(idValoracion))}`,
            valoracion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarValoracion(idValoracion: number): Observable<any> {
        // Validate
        if (idValoracion === null || idValoracion === undefined) {
            throw new Error('Required parameter idValoracion was null or undefined when calling eliminarValoracion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/valoracion/${encodeURIComponent(String(idValoracion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
