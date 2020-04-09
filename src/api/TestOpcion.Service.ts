import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { TestOpcion, _TestOpcion } from '../models/TestOpcion';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class TestOpcionService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarTestOpciones(fkTestNodo?: number, fkTestNodoSig?: number, clave?: string, texto?: string, ordenarPor?: string,
                              ordenarModo?: OrderModeEnum): Observable<any> {







        let queryParameters = new HttpParams();
        if (fkTestNodo !== undefined && fkTestNodo !== null) {
            queryParameters = queryParameters.set('fkTestNodo', <any>fkTestNodo);
        }
        if (fkTestNodoSig !== undefined && fkTestNodoSig !== null) {
            queryParameters = queryParameters.set('fkTestNodoSig', <any>fkTestNodoSig);
        }
        if (clave !== undefined && clave !== null) {
            queryParameters = queryParameters.set('clave', <any>clave);
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

        return this.httpClient.get<any>(`${this.manager.basePath}/testOpcion`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearTestOpcion(testOpcion: TestOpcion): Observable<any> {

        if (testOpcion === null || testOpcion === undefined) {
            throw new Error('Required parameter testOpcion was null or undefined when calling crearTestOpcion.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/testOpcion`,
            testOpcion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerTestOpcion(idTestOpcion: number): Observable<any> {

        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling obtenerTestOpcion.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarTestOpcion(idTestOpcion: number, testOpcion: TestOpcion): Observable<any> {

        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling actualizarTestOpcion.');
        }

        if (testOpcion === null || testOpcion === undefined) {
            throw new Error('Required parameter testOpcion was null or undefined when calling actualizarTestOpcion.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            testOpcion,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarTestOpcion(idTestOpcion: number): Observable<any> {

        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling eliminarTestOpcion.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public descargarTestOpcionArchivo(idTestOpcion: number): Observable<any> {

        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling descargarTestOpcionArchivo.');
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

        return this.httpClient.get(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}/archivo`,
            {
                responseType: 'blob',
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cargarTestOpcionArchivo(idTestOpcion: number, archivo: Blob): Observable<any> {

        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling cargarTestOpcionArchivo.');
        }

        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarTestOpcionArchivo.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}/archivo`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
