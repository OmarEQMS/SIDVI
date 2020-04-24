import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import {Medico} from '../../../models/Medico';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion, IUbicacion } from 'src/models';

@Component({
selector: 'app-mi-consultorio',
templateUrl: './mi-consultorio.component.html',
styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
    consultorioForm: FormGroup;
    hayErrores: boolean;
    crearConsultorio = true;
    ubicacion: Ubicacion;
    localIcono: IconDefinition;
    consultoriosList: Medico[]; consultorio: Medico;
    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(private sidvi: SIDVIServices, private _router: Router) {
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false});
        this.hayErrores = false;
        this.localIcono = this.icons.guion;
        this.consultorio = new Medico();
        this.consultorioForm = new FormGroup({
        nombreDr:         new FormControl('', Validators.required),   cedula:    new FormControl('', Validators.required),
        nombreConsultorio: new FormControl('', Validators.required),   telefono:  new FormControl('', Validators.required),
        direccion:        new FormControl('', Validators.required),   ubicacion: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),         imagen:    new FormControl(),
        });
    }

    ngOnInit() {
        // TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
        this.sidvi.medico.listarMedicos(this.sidvi.manager.usuario.idUsuario, null, null, null, null, null, null, null, null)
            .subscribe(res => {
            this.consultoriosList = res.resultados;
            }, err => { console.log(err); });
        }

    async ionViewWillEnter() {
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false});
        await this.getUbicacionesHijo(this.ubicacion);
    }

    async getUbicacionesHijo(ubicacion: Ubicacion) {
        const result = await this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).toPromise();
        ubicacion.ubicaciones = result.resultados.map((item: any) => new Ubicacion(item));
        if (result.total > 0) { ubicacion.localPadre = true; ubicacion.localIcono = this.icons.plus; }

        for (const ubi of ubicacion.ubicaciones) {
            ubi.localSelected = ubicacion.localSelected;
            await this.getUbicacionesHijo(ubi);
        }
    }

    ubicacionSelected(idUbicacion: number) {
        this.unselectUbicacion(this.ubicacion, idUbicacion);
    }
    unselectUbicacion(ubicacion: Ubicacion, idUbicacion: number) {
        if (ubicacion.idUbicacion !== idUbicacion) { ubicacion.localSelected = false; }
        for (const ubi of ubicacion.ubicaciones) {
            this.unselectUbicacion(ubi, idUbicacion);
        }
    }

    registrar() {
        console.log(this.consultorio);
        console.log('registrar ' + this.consultorioForm.status );
        if  (this.consultorioForm.status ===  'VALID') {
        console.log( this.consultorioForm.value.ubicacion);
        this.hayErrores = false;
        this.consultorio.fkUsuario         = this.sidvi.manager.usuario.idUsuario;
        this.consultorio.fkUbicacion       = this.consultorioForm.value.ubicacion;
        this.consultorio.nombreConsultorio = this.consultorioForm.value.nombreConsultorio;
        this.consultorio.nombreDoctor      = this.consultorioForm.value.nombreDr;
        this.consultorio.direccionConsultorio = this.consultorioForm.value.direccion;
        this.consultorio.telefonoConsultorio  = this.consultorioForm.value.telefono;
        this.consultorio.cedulaProfesional = this.consultorioForm.value.cedula;
        this.consultorio.descripcion       = this.consultorioForm.value.descripcion;
        this.consultorio.mimetypeFoto      = null; // NO SEEE :(
        if (this.consultorioForm.value.image == null) {   // no seeee :(
            this.consultorio.archivoFoto = 'null'; console.log('parte 1');
        } else {
            this.consultorio.archivoFoto = 'NULL'; console.log('part 2'); // this.consultorioForm.value.imagen;
        }
        this.sidvi.medico.crearMedico(this.consultorio)
            .subscribe(res => {
                console.log('res');
                console.log(res);
            }, err => { console.log(err); });
        } else if  (this.consultorioForm.status ===  'INVALID') {
        this.hayErrores = true;
        }
    }

    verConsultorio(con: Medico) {
        this.crearConsultorio = false;
        if (this.consultorio !== con) {
        this.consultorio = con;
        }
    }

    crearConsultorioF() {
        if (this.crearConsultorio === false) {
        this.crearConsultorio = true;
        this.consultorio = new Medico();
        }
    }
}
