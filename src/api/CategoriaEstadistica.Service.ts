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




        let queryParameters = new HttpParams();
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

        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaEstadistica`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearCategoriaEstadistica(categoriaEstadistica: CategoriaEstadistica): Observable<any> {

        if (categoriaEstadistica === null || categoriaEstadistica === undefined) {
            throw new Error('Required parameter categoriaEstadistica was null or undefined when calling crearCategoriaEstadistica.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/categoriaEstadistica`,
            categoriaEstadistica,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerCategoriaEstadistica(idCategoriaEstadistica: number): Observable<any> {

        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling obtenerCategoriaEstadistica.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/categoriaEstadistica/${encodeURIComponent(String(idCategoriaEstadistica))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarCategoriaEstadistica(idCategoriaEstadistica: number, categoriaEstadistica: CategoriaEstadistica): Observable<any> {

        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling actualizarCategoriaEstadistica.');
        }

        if (categoriaEstadistica === null || categoriaEstadistica === undefined) {
            throw new Error('Required parameter categoriaEstadistica was null or undefined when calling actualizarCategoriaEstadistica.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/categoriaEstadistica/${encodeURIComponent(String(idCategoriaEstadistica))}`,
            categoriaEstadistica,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarCategoriaEstadistica(idCategoriaEstadistica: number): Observable<any> {

        if (idCategoriaEstadistica === null || idCategoriaEstadistica === undefined) {
            throw new Error('Required parameter idCategoriaEstadistica was null or undefined when calling eliminarCategoriaEstadistica.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/categoriaEstadistica/${encodeURIComponent(String(idCategoriaEstadistica))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
