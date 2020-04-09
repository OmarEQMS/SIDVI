import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable }from 'rxjs';

import { APIResponse } from './APIResponse';
import { Medico, _Medico } from '../models/Medico';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class MedicoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarMedicos(fkUsuario?: number, fkUbicacion?: number, nombreConsultorio?: string, nombreDoctor?: string,
                         ordenarPor?: string, ordenarModo?: OrderModeEnum, tamanoPagina?: number, indicePagina?: number): Observable<any> {
        let queryParameters = new HttpParams();
        if (fkUsuario !== undefined && fkUsuario !== null) {
            queryParameters = queryParameters.set('fkUsuario', <any>fkUsuario);
        }
        if (fkUbicacion !== undefined && fkUbicacion !== null) {
            queryParameters = queryParameters.set('fkUbicacion', <any>fkUbicacion);
        }
        if (nombreConsultorio !== undefined && nombreConsultorio !== null) {
            queryParameters = queryParameters.set('nombreConsultorio', <any>nombreConsultorio);
        }
        if (nombreDoctor !== undefined && nombreDoctor !== null) {
            queryParameters = queryParameters.set('nombreDoctor', <any>nombreDoctor);
        }
        if (ordenarPor !== undefined && ordenarPor !== null) {
            queryParameters = queryParameters.set('ordenarPor', <any>ordenarPor);
        }
        if (ordenarModo !== undefined && ordenarModo !== null) {
            queryParameters = queryParameters.set('ordenarModo', <any>ordenarModo);
        }
        if (tamanoPagina !== undefined && tamanoPagina !== null) {
            queryParameters = queryParameters.set('tamanoPagina', <any>tamanoPagina);
        }
        if (indicePagina !== undefined && indicePagina !== null) {
            queryParameters = queryParameters.set('indicePagina', <any>indicePagina);
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

        return this.httpClient.get<any>(`${this.manager.basePath}/medico`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearMedico(medico: Medico): Observable<any> {

        if (medico === null || medico === undefined) {
            throw new Error('Required parameter medico was null or undefined when calling crearMedico.');
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

        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/medico`,
            medico,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerMedico(idMedico: number): Observable<any> {

        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling obtenerMedico.');
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

        return this.httpClient.get<any>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarMedico(idMedico: number, medico: Medico): Observable<any> {

        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling actualizarMedico.');
        }

        if (medico === null || medico === undefined) {
            throw new Error('Required parameter medico was null or undefined when calling actualizarMedico.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            medico,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarMedico(idMedico: number): Observable<any> {

        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling eliminarMedico.');
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

        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public descargarMedicoFoto(idMedico: number): Observable<any> {

        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling descargarMedicoFoto.');
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

        return this.httpClient.get(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}/foto`,
            {
                responseType: 'blob',
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cargarMedicoFoto(idMedico: number, foto: Blob): Observable<any> {

        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling cargarMedicoFoto.');
        }

        if (foto === null || foto === undefined) {
            throw new Error('Required parameter foto was null or undefined when calling cargarMedicoFoto.');
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

        if (foto !== undefined) {
            formParams = formParams.append('foto', <any>foto) || formParams;
        }

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}/foto`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
