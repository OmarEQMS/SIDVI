import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Medico, _Medico } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class MedicoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarMedicos(fkUsuario?: number, fkUbicacion?: number[], nombreConsultorio?: string, nombreDoctor?: string,
                         ordenarPor?: string, ordenarModo?: OrderModeEnum, tamanoPagina?: number, indicePagina?: number): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkUsuario !== undefined && fkUsuario !== null) {
            queryParameters = queryParameters.set('fkUsuario', fkUsuario.toString());
        }
        if (fkUbicacion !== undefined && fkUbicacion !== null) {
            queryParameters = queryParameters.set('fkUbicacion', fkUbicacion.toString());
        }
        if (nombreConsultorio !== undefined && nombreConsultorio !== null) {
            queryParameters = queryParameters.set('nombreConsultorio', nombreConsultorio);
        }
        if (nombreDoctor !== undefined && nombreDoctor !== null) {
            queryParameters = queryParameters.set('nombreDoctor', nombreDoctor);
        }
        if (ordenarPor !== undefined && ordenarPor !== null) {
            queryParameters = queryParameters.set('ordenarPor', ordenarPor);
        }
        if (ordenarModo !== undefined && ordenarModo !== null) {
            queryParameters = queryParameters.set('ordenarModo', ordenarModo);
        }
        if (tamanoPagina !== undefined && tamanoPagina !== null) {
            queryParameters = queryParameters.set('tamanoPagina', tamanoPagina.toString());
        }
        if (indicePagina !== undefined && indicePagina !== null) {
            queryParameters = queryParameters.set('indicePagina', indicePagina.toString());
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/medico`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearMedico(medico: Medico): Observable<any> {
        // Validate
        if (medico === null || medico === undefined) {
            throw new Error('Required parameter medico was null or undefined when calling crearMedico.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/medico`,
            medico.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerMedico(idMedico: number): Observable<any> {
        // Validate
        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling obtenerMedico.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarMedico(idMedico: number, medico: Medico): Observable<any> {
        // Validate
        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling actualizarMedico.');
        }
        if (medico === null || medico === undefined) {
            throw new Error('Required parameter medico was null or undefined when calling actualizarMedico.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            medico.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarMedico(idMedico: number): Observable<any> {
        // Validate
        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling eliminarMedico.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public descargarMedicoFoto(idMedico: number): Observable<any> {
        // Validate
        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling descargarMedicoFoto.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}/foto`,
            { responseType: 'blob', headers, observe: 'body', reportProgress: true }
        );
    }

    public urlMedicoFoto(idMedico: number): string {
        return `${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}/archivo` +
               `?TokenUsuario=${encodeURIComponent(this.manager.tokenUsuario)}`;
    }

    public cargarMedicoFoto(idMedico: number, foto: Blob): Observable<any> {
        // Validate
        if (idMedico === null || idMedico === undefined) {
            throw new Error('Required parameter idMedico was null or undefined when calling cargarMedicoFoto.');
        }
        if (foto === null || foto === undefined) {
            throw new Error('Required parameter foto was null or undefined when calling cargarMedicoFoto.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // FormParams
        const formParams = new FormData();
        if (foto !== undefined) {
            formParams.append('foto', foto);
        }

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/medico/${encodeURIComponent(String(idMedico))}/foto`,
            formParams, { headers, observe: 'body', reportProgress: true }
        );
    }

}
