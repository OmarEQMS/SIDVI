import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { TestNodo, _TestNodo } from '../models/TestNodo';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class TestNodoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarTestNodos(fkVirus?: number, texto?: string, ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {





        let queryParameters = new HttpParams();
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', <any>fkVirus);
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

        return this.httpClient.get<any>(`${this.manager.basePath}/testNodo`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearTestNodo(testNodo: TestNodo): Observable<any> {

        if (testNodo === null || testNodo === undefined) {
            throw new Error('Required parameter testNodo was null or undefined when calling crearTestNodo.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/testNodo`,
            testNodo,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerTestNodo(idTestNodo: number): Observable<any> {

        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling obtenerTestNodo.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarTestNodo(idTestNodo: number, testNodo: TestNodo): Observable<any> {

        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling actualizarTestNodo.');
        }

        if (testNodo === null || testNodo === undefined) {
            throw new Error('Required parameter testNodo was null or undefined when calling actualizarTestNodo.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            testNodo,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarTestNodo(idTestNodo: number): Observable<any> {

        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling eliminarTestNodo.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public descargarTestNodoArchivo(idTestNodo: number): Observable<any> {

        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling descargarTestNodoArchivo.');
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

        return this.httpClient.get(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}/archivo`,
            {
                responseType: 'blob',
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cargarTestNodoArchivo(idTestNodo: number, archivo: Blob): Observable<any> {

        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling cargarTestNodoArchivo.');
        }

        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarTestNodoArchivo.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}/archivo`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
