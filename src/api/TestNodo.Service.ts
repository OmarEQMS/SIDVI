import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { TestNodo, _TestNodo } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class TestNodoService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarTestNodos(fkVirus?: number, texto?: string, ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', fkVirus.toString());
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
        return this.httpClient.get<any>(`${this.manager.basePath}/testNodo`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearTestNodo(testNodo: TestNodo): Observable<any> {
        // Validate
        if (testNodo === null || testNodo === undefined) {
            throw new Error('Required parameter testNodo was null or undefined when calling crearTestNodo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/testNodo`,
            testNodo.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerTestNodo(idTestNodo: number): Observable<any> {
        // Validate
        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling obtenerTestNodo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarTestNodo(idTestNodo: number, testNodo: TestNodo): Observable<any> {
        // Validate
        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling actualizarTestNodo.');
        }
        if (testNodo === null || testNodo === undefined) {
            throw new Error('Required parameter testNodo was null or undefined when calling actualizarTestNodo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            testNodo.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarTestNodo(idTestNodo: number): Observable<any> {
        // Validate
        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling eliminarTestNodo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public descargarTestNodoArchivo(idTestNodo: number): Observable<any> {
        // Validate
        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling descargarTestNodoArchivo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}/archivo`,
            { responseType: 'blob', headers, observe: 'body', reportProgress: true }
        );
    }

    public urlTestNodoArchivo(idTestNodo: number): string {
        return `${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}/archivo` +
               `?TokenUsuario=${encodeURIComponent(this.manager.tokenUsuario)}`;
    }

    public cargarTestNodoArchivo(idTestNodo: number, archivo: Blob): Observable<any> {
        // Validate
        if (idTestNodo === null || idTestNodo === undefined) {
            throw new Error('Required parameter idTestNodo was null or undefined when calling cargarTestNodoArchivo.');
        }
        if (archivo === null || archivo === undefined) {
            throw new Error('Required parameter archivo was null or undefined when calling cargarTestNodoArchivo.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
       // headers = headers.set('Content-Type', 'application/json');

        // FormParams
        const formParams = new FormData();
        if (archivo !== undefined) {
            formParams.append('archivo', archivo);
        }

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/testNodo/${encodeURIComponent(String(idTestNodo))}/archivo`,
            formParams, { headers, observe: 'body', reportProgress: true }
        );
    }

}
