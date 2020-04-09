import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { CelularEstado, _CelularEstado } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class CelularEstadoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarCelularEstados(celular?: string, fkVirus?: number, seccion?: _CelularEstado.Seccion, ordenarPor?: string,
                                ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (celular !== undefined && celular !== null) {
            queryParameters = queryParameters.set('celular', celular);
        }
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', fkVirus.toString());
        }
        if (seccion !== undefined && seccion !== null) {
            queryParameters = queryParameters.set('seccion', seccion);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/celularEstado`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearCelularEstado(celularEstado: CelularEstado): Observable<any> {
        // Validate
        if (celularEstado === null || celularEstado === undefined) {
            throw new Error('Required parameter celularEstado was null or undefined when calling crearCelularEstado.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/celularEstado`,
            celularEstado.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerCelularEstado(idCelularEstado: number): Observable<any> {
        // Validate
        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling obtenerCelularEstado.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarCelularEstado(idCelularEstado: number, celularEstado: CelularEstado): Observable<any> {
        // Validate
        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling actualizarCelularEstado.');
        }
        if (celularEstado === null || celularEstado === undefined) {
            throw new Error('Required parameter celularEstado was null or undefined when calling actualizarCelularEstado.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            celularEstado.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarCelularEstado(idCelularEstado: number): Observable<any> {
        // Validate
        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling eliminarCelularEstado.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
