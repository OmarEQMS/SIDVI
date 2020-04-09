import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Ubicacion, _Ubicacion } from '../models/Ubicacion';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class UbicacionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarUbicaciones(fkUbicacion?: number, clave?: string, nombre?: string, ordenarPor?: string,
                             ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkUbicacion !== undefined && fkUbicacion !== null) {
            queryParameters = queryParameters.set('fkUbicacion', fkUbicacion.toString());
        }
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
        return this.httpClient.get<any>(`${this.manager.basePath}/ubicacion`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearUbicacion(ubicacion: Ubicacion): Observable<any> {
        // VAlidate
        if (ubicacion === null || ubicacion === undefined) {
            throw new Error('Required parameter ubicacion was null or undefined when calling crearUbicacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/ubicacion`,
            ubicacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerUbicacion(idUbicacion: number): Observable<any> {
        // Validate
        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling obtenerUbicacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarUbicacion(idUbicacion: number, ubicacion: Ubicacion): Observable<any> {
        // Validate
        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling actualizarUbicacion.');
        }
        if (ubicacion === null || ubicacion === undefined) {
            throw new Error('Required parameter ubicacion was null or undefined when calling actualizarUbicacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            ubicacion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarUbicacion(idUbicacion: number): Observable<any> {
        // Validate
        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling eliminarUbicacion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

}
