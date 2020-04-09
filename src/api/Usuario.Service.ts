import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { Usuario, _Usuario } from '../models/Usuario';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class UsuarioService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public autenticacion(usuario: string, contrasena: string): Observable<any> {
        // Validate
        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling autenticacion.');
        }
        if (contrasena === null || contrasena === undefined) {
            throw new Error('Required parameter contrasena was null or undefined when calling autenticacion.');
        }

        // Params
        let queryParameters = new HttpParams();
        if (usuario !== undefined && usuario !== null) {
            queryParameters = queryParameters.set('usuario', <any>usuario);
        }
        if (contrasena !== undefined && contrasena !== null) {
            queryParameters = queryParameters.set('contrasena', <any>contrasena);
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<APIResponse>(`${this.manager.basePath}/usuario/autenticacion`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cerrarSesion(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<APIResponse>(`${this.manager.basePath}/usuario/cerrarSesion`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cambiarContrasena(usuario?: string, contrasena?: string, nuevaContrasena?: string): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (usuario !== undefined && usuario !== null) {
            queryParameters = queryParameters.set('usuario', <any>usuario);
        }
        if (contrasena !== undefined && contrasena !== null) {
            queryParameters = queryParameters.set('contrasena', <any>contrasena);
        }
        if (nuevaContrasena !== undefined && nuevaContrasena !== null) {
            queryParameters = queryParameters.set('nuevaContrasena', <any>nuevaContrasena);
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<APIResponse>(`${this.manager.basePath}/usuario/cambiarContrasena`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public recuperacion(usuario?: string): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (usuario !== undefined && usuario !== null) {
            queryParameters = queryParameters.set('usuario', <any>usuario);
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<APIResponse>(`${this.manager.basePath}/usuario/recuperacion`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public restablecer(token?: string, usuario?: string, nuevaContrasena?: string): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', <any>token);
        }
        if (usuario !== undefined && usuario !== null) {
            queryParameters = queryParameters.set('usuario', <any>usuario);
        }
        if (nuevaContrasena !== undefined && nuevaContrasena !== null) {
            queryParameters = queryParameters.set('nuevaContrasena', <any>nuevaContrasena);
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<APIResponse>(`${this.manager.basePath}/usuario/restablecer`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public listarUsuarios(nombreCompleto?: string, usuario?: string, correo?: string, celular?: string, rol?: _Usuario.Rol,
                          ordenarPor?: string, ordenarModo?: OrderModeEnum, tamanoPagina?: number, indicePagina?: number): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (nombreCompleto !== undefined && nombreCompleto !== null) {
            queryParameters = queryParameters.set('nombreCompleto', <any>nombreCompleto);
        }
        if (usuario !== undefined && usuario !== null) {
            queryParameters = queryParameters.set('usuario', <any>usuario);
        }
        if (correo !== undefined && correo !== null) {
            queryParameters = queryParameters.set('correo', <any>correo);
        }
        if (celular !== undefined && celular !== null) {
            queryParameters = queryParameters.set('celular', <any>celular);
        }
        if (rol !== undefined && rol !== null) {
            queryParameters = queryParameters.set('rol', <any>rol);
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

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/usuario`,
            {
                params: queryParameters,
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public crearUsuario(usuario: Usuario): Observable<any> {
        // Validate
        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling crearUsuario.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/usuario`,
            usuario,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public obtenerUsuario(idUsuario: number): Observable<any> {
        // Validate
        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling obtenerUsuario.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/usuario/${encodeURIComponent(String(idUsuario))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public actualizarUsuario(idUsuario: number, usuario: Usuario): Observable<any> {
        // Validate
        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling actualizarUsuario.');
        }
        if (usuario === null || usuario === undefined) {
            throw new Error('Required parameter usuario was null or undefined when calling actualizarUsuario.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/usuario/${encodeURIComponent(String(idUsuario))}`,
            usuario,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public eliminarUsuario(idUsuario: number): Observable<any> {
        // Validate
        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling eliminarUsuario.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/usuario/${encodeURIComponent(String(idUsuario))}`,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public descargarUsuarioFoto(idUsuario: number): Observable<any> {
        // Validate
        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling descargarUsuarioFoto.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get(`${this.manager.basePath}/usuario/${encodeURIComponent(String(idUsuario))}/foto`,
            {
                responseType: 'blob',
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

    public cargarUsuarioFoto(idUsuario: number, foto: Blob): Observable<any> {
        // Validate
        if (idUsuario === null || idUsuario === undefined) {
            throw new Error('Required parameter idUsuario was null or undefined when calling cargarUsuarioFoto.');
        }
        if (foto === null || foto === undefined) {
            throw new Error('Required parameter foto was null or undefined when calling cargarUsuarioFoto.');
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

        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/usuario/${encodeURIComponent(String(idUsuario))}/foto`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                
                headers,
                observe: 'body',
                reportProgress: true
            }
        );
    }

}
