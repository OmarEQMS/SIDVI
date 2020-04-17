import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIResponse } from './APIResponse';
import { MedicoVirus, _MedicoVirus, _Medico } from '../models';
import { ManagerService } from './Manager.Service';
import { OrderModeEnum } from './API';

@Injectable()
export class MedicoVirusService {
    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient, protected manager: ManagerService) { }

    public listarMedicosVirus(fkMedico?: number, fkVirus?: number, nombre?: string, fkUbicacion?: number[], estatus?: _Medico.Estatus,
                              ordenarPor?: string, ordenarModo?: OrderModeEnum): Observable<any> {
        // Params
        let queryParameters = new HttpParams();
        if (fkMedico !== undefined && fkMedico !== null) {
            queryParameters = queryParameters.set('fkMedico', fkMedico.toString());
        }
        if (fkVirus !== undefined && fkVirus !== null) {
            queryParameters = queryParameters.set('fkVirus', fkVirus.toString());
        }
        if (nombre !== undefined && nombre !== null) {
            queryParameters = queryParameters.set('nombre', nombre);
        }
        if (fkUbicacion !== undefined && fkUbicacion !== null && fkUbicacion.length > 0) {
            queryParameters = queryParameters.set('fkUbicacion', fkUbicacion.toString());
        }
        if (estatus !== undefined && estatus !== null) {
            queryParameters = queryParameters.set('estatus', estatus);
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
        return this.httpClient.get<any>(`${this.manager.basePath}/medicoVirus`,
            { params: queryParameters, headers, observe: 'body', reportProgress: true }
        );
    }

    public crearMedicoVirus(medicoVirus: MedicoVirus): Observable<any> {
        // Validate
        if (medicoVirus === null || medicoVirus === undefined) {
            throw new Error('Required parameter medicoVirus was null or undefined when calling crearMedicoVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.post<APIResponse>(`${this.manager.basePath}/medicoVirus`,
            medicoVirus.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public obtenerMedicoVirus(idMedicoVirus: number): Observable<any> {
        // Validate
        if (idMedicoVirus === null || idMedicoVirus === undefined) {
            throw new Error('Required parameter idMedicoVirus was null or undefined when calling obtenerMedicoVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.get<any>(`${this.manager.basePath}/medicoVirus/${encodeURIComponent(String(idMedicoVirus))}`,
            { headers, observe: 'body', reportProgress: true }
        );
    }

    public actualizarMedicoVirus(idMedicoVirus: number, medicoVirus: MedicoVirus): Observable<any> {
        // Validate
        if (idMedicoVirus === null || idMedicoVirus === undefined) {
            throw new Error('Required parameter idMedicoVirus was null or undefined when calling actualizarMedicoVirus.');
        }
        if (medicoVirus === null || medicoVirus === undefined) {
            throw new Error('Required parameter medicoVirus was null or undefined when calling actualizarMedicoVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.put<APIResponse>(`${this.manager.basePath}/medicoVirus/${encodeURIComponent(String(idMedicoVirus))}`,
            medicoVirus.toObjectDB(), { headers, observe: 'body', reportProgress: true }
        );
    }

    public eliminarMedicoVirus(idMedicoVirus: number): Observable<any> {
        // Validate
        if (idMedicoVirus === null || idMedicoVirus === undefined) {
            throw new Error('Required parameter idMedicoVirus was null or undefined when calling eliminarMedicoVirus.');
        }

        // Headers
        let headers = this.defaultHeaders;
        if (this.manager.tokenUsuario) {
            headers = headers.set('TokenUsuario', this.manager.tokenUsuario);
        }
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Content-Type', 'application/json');

        // Request
        return this.httpClient.delete<APIResponse>(`${this.manager.basePath}/medicoVirus/${encodeURIComponent(String(idMedicoVirus))}`,
            {headers, observe: 'body', reportProgress: true }
        );
    }

}
