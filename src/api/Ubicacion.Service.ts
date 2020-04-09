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






        let queryParameters = new HttpParams();
        if (fkUbicacion !== undefined && fkUbicacion !== null) {
            queryParameters = queryParameters.set('fkUbicacion', <any>fkUbicacion);
        }
        if (clave !== undefined && clave !== null) {
            queryParameters = queryParameters.set('clave', <any>clave);
        }
        if (nombre !== undefined && nombre !== null) {
            queryParameters = queryParameters.set('nombre', <any>nombre);
        }
        if (ordenarPor !== undefined && ordenarPor !== null) {
            queryParameters = queryParameters.set('ordenarPor', <any>ordenarPor);
        }
        if (ordenarModo !== undefined && ordenarModo !== null) {
            queryParameters = queryParameters.set('ordenarModo', <any>ordenarModo);
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<any>(`${this.manager.basePath}/ubicacion`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearUbicacion(ubicacion: Ubicacion): Observable<any> {

        if (ubicacion === null || ubicacion === undefined) {
            throw new Error('Required parameter ubicacion was null or undefined when calling crearUbicacion.');
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/ubicacion`,
            ubicacion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerUbicacion(idUbicacion: number): Observable<any> {

        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling obtenerUbicacion.');
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<any>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarUbicacion(idUbicacion: number, ubicacion: Ubicacion): Observable<any> {

        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling actualizarUbicacion.');
        }

        if (ubicacion === null || ubicacion === undefined) {
            throw new Error('Required parameter ubicacion was null or undefined when calling actualizarUbicacion.');
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            ubicacion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarUbicacion(idUbicacion: number): Observable<any> {

        if (idUbicacion === null || idUbicacion === undefined) {
            throw new Error('Required parameter idUbicacion was null or undefined when calling eliminarUbicacion.');
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/ubicacion/${encodeURIComponent(String(idUbicacion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
