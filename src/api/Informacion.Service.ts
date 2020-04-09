import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Informacion, _Informacion } from '../models/Informacion';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class InformacionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarInformaciones(fkVirus?: number, fkCategoriaInformacion?: number, texto?: string, ordenarPor?: string,
                               ordenarModo?: OrderModeEnum): Observable<any> {
        let queryParameters = new HttpParams();
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', <any>fkVirus);
        }
        if (fkCategoriaInformacion !== undefined && fkCategoriaInformacion !== null) {
            queryParameters = queryParameters.set('fkCategoriaInformacion', <any>fkCategoriaInformacion);
        }
        if (texto !== undefined && texto !== null) {
            queryParameters = queryParameters.set('texto', <any>texto);
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

        return this.httpClient.get<any>(`${this.manager.basePath}/informacion`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearInformacion(informacion: Informacion): Observable<any> {

        if (informacion === null || informacion === undefined) {
            throw new Error('Required parameter informacion was null or undefined when calling crearInformacion.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/informacion`,
            informacion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerInformacion(idInformacion: number): Observable<any> {

        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling obtenerInformacion.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarInformacion(idInformacion: number, informacion: Informacion): Observable<any> {

        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling actualizarInformacion.');
        }

        if (informacion === null || informacion === undefined) {
            throw new Error('Required parameter informacion was null or undefined when calling actualizarInformacion.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            informacion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarInformacion(idInformacion: number): Observable<any> {

        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling eliminarInformacion.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public descargarInformacionArchivo(idInformacion: number): Observable<any> {

        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling descargarInformacionArchivo.');
        }

        let headers = this.defaultHeaders;

        // authentication (TokenUsuario) required
        if (this.configuration.apiKeys["TokenUsuario"]) {
            headers = headers.set('TokenUsuario', this.configuration.apiKeys["TokenUsuario"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/octet-stream'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}/archivo`,
            {
                responseType: 'blob',
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cargarInformacionArchivo(idInformacion: number, archivo: Blob): Observable<any> {

        if (idInformacion === null || idInformacion === undefined) {
            throw new Error('Required parameter idInformacion was null or undefined when calling cargarInformacionArchivo.');
        }

        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarInformacionArchivo.');
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
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams();
        }

        if (archivo !== undefined) {
            formParams = formParams.append('archivo', <any>archivo) || formParams;
        }

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/informacion/${encodeURIComponent(String(idInformacion))}/archivo`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
