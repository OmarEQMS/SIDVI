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
        // Params
        let queryParameters = new HttpParams();
        if (fkTestNodo !== undefined && fkTestNodo !== null) {
            queryParameters = queryParameters.set('fkTestNodo', fkTestNodo.toString());
        }
        if (fkTestNodoSig !== undefined && fkTestNodoSig !== null) {
            queryParameters = queryParameters.set('fkTestNodoSig', fkTestNodoSig.toString());
        }
        if (clave !== undefined && clave !== null) {
            queryParameters = queryParameters.set('clave', clave);
        }
        if (texto !== undefined && texto !== null) {
            queryParameters = queryParameters.set('texto', texto);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/testOpcion`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearTestOpcion(testOpcion: TestOpcion): Observable<any> {
        // Validate
        if (testOpcion === null || testOpcion === undefined) {
            throw new Error('Required parameter testOpcion was null or undefined when calling crearTestOpcion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/testOpcion`,
            testOpcion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerTestOpcion(idTestOpcion: number): Observable<any> {
        // Validate
        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling obtenerTestOpcion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarTestOpcion(idTestOpcion: number, testOpcion: TestOpcion): Observable<any> {
        // Validate
        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling actualizarTestOpcion.');
        }
        if (testOpcion === null || testOpcion === undefined) {
            throw new Error('Required parameter testOpcion was null or undefined when calling actualizarTestOpcion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            testOpcion.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarTestOpcion(idTestOpcion: number): Observable<any> {
        // Validate
        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling eliminarTestOpcion.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public descargarTestOpcionArchivo(idTestOpcion: number): Observable<any> {
        // Validate
        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling descargarTestOpcionArchivo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}/archivo`,
            { responseType: 'blob', headers, observe: 'body', reportProgress: true }
        );
    }

    public urlTestOpcionArchivo(idTestOpcion: number): string {
        return `${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}/archivo` +
               `?TokenUsuario=${encodeURIComponent(this.manager.tokenUsuario)}`;
    }

    public cargarTestOpcionArchivo(idTestOpcion: number, archivo: Blob): Observable<any> {
        // Validate
        if (idTestOpcion === null || idTestOpcion === undefined) {
            throw new Error('Required parameter idTestOpcion was null or undefined when calling cargarTestOpcionArchivo.');
        }
        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarTestOpcionArchivo.');
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
        if (archivo !== undefined) {
            formParams.append('archivo', archivo);
        }

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testOpcion/${encodeURIComponent(String(idTestOpcion))}/archivo`,
            formParams, { headers, observe: 'body', reportProgress: true }
        );
    }

}
