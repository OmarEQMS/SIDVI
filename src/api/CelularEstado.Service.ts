import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { CelularEstado, _CelularEstado } from '../models/CelularEstado';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class CelularEstadoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarCelularEstados(celular?: string, fkVirus?: number, seccion?: _CelularEstado.Seccion, ordenarPor?: string,
                                ordenarModo?: OrderModeEnum): Observable<any> {
        let queryParameters = new HttpParams();
        if (celular !== undefined && celular !== null) {
            queryParameters = queryParameters.set('celular', <any>celular);
        }
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', <any>fkVirus);
        }
        if (seccion !== undefined && seccion !== null) {
            queryParameters = queryParameters.set('seccion', <any>seccion);
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

        return this.httpClient.get<any>(`${this.manager.basePath}/celularEstado`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearCelularEstado(celularEstado: CelularEstado): Observable<any> {

        if (celularEstado === null || celularEstado === undefined) {
            throw new Error('Required parameter celularEstado was null or undefined when calling crearCelularEstado.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/celularEstado`,
            celularEstado,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerCelularEstado(idCelularEstado: number): Observable<any> {

        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling obtenerCelularEstado.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarCelularEstado(idCelularEstado: number, celularEstado: CelularEstado): Observable<any> {

        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling actualizarCelularEstado.');
        }

        if (celularEstado === null || celularEstado === undefined) {
            throw new Error('Required parameter celularEstado was null or undefined when calling actualizarCelularEstado.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            celularEstado,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarCelularEstado(idCelularEstado: number): Observable<any> {

        if (idCelularEstado === null || idCelularEstado === undefined) {
            throw new Error('Required parameter idCelularEstado was null or undefined when calling eliminarCelularEstado.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/celularEstado/${encodeURIComponent(String(idCelularEstado))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
