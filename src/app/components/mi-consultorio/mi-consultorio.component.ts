import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion, IUbicacion, Medico, Virus } from 'src/models';

@Component({
selector: 'app-mi-consultorio',
templateUrl: './mi-consultorio.component.html',
styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
    consultorioForm: FormGroup;
    hayErrores: boolean; crearConsultorio: boolean;
    ubicacion: Ubicacion; ubiName: string;
    localIcono: IconDefinition;
    consultoriosList: Medico[]; consultorio: Medico;
    virus: Virus[];
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
        nombreDoctor:         new FormControl('', Validators.required),   cedula:    new FormControl('', Validators.required),
        nombreConsultorio: new FormControl('', Validators.required),   telefonoConsultorio:  new FormControl('', Validators.required),
        direccionConsultorio:        new FormControl('', Validators.required),   ubicacion: new FormControl(),
        descripcion: new FormControl('', Validators.required),         imagen:    new FormControl(),
        });
    }

    ngOnInit() {
        // TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
        this.crearConsultorio = true;
        this.sidvi.medico.listarMedicos(this.sidvi.manager.usuario.idUsuario, null, null, null, null, null, null, null, null)
            .subscribe(res => {
            this.consultoriosList = res.resultados;
            console.log(this.consultoriosList);
            }, err => { console.log(err); });
        this.sidvi.virus.listarVirus(null, null, null, null, null, null)
            .subscribe(res =>{
                this.virus = res.resultados;
            }, err => console.log(err));
        this.consultorio.fkUbicacion =-1;
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
        if (this.consultorio.fkUbicacion == idUbicacion){
            this.consultorio.fkUbicacion = -1;
        }else{
            this.consultorio.fkUbicacion = idUbicacion;
        }
        console.log("id "+this.consultorio.fkUbicacion );
    }

    unselectUbicacion(ubicacion: Ubicacion, idUbicacion: number) {
        if (ubicacion.idUbicacion !== idUbicacion) { ubicacion.localSelected = false; }
        for (const ubi of ubicacion.ubicaciones) {
            this.unselectUbicacion(ubi, idUbicacion);
        }
    }

    registrar() {
        console.log(this.consultorio.fkUbicacion);
        console.log('registrar ' + this.consultorioForm.status );
        if  (this.consultorioForm.status ===  'VALID' && this.consultorio.fkUbicacion != -1) {
            this.hayErrores = false;
            delete this.consultorio.mimetypeFoto;
            delete this.consultorio.archivoFoto;
            console.log(this.consultorio);
        this.sidvi.medico.crearMedico(this.consultorio)
            .subscribe(res => {
                console.log(res);
            }, err => { console.log(err); });

        } else  {
        this.hayErrores = true;
        }
    }

    obtenerUbicaciones(consultorio: Medico){
        this.sidvi.ubicacion.obtenerUbicacion( consultorio.fkUbicacion)
            .subscribe(ubi => {
                if(ubi){
                    this.ubiName = ubi.nombre;
                } 
            });
    }

    verConsultorio(con: Medico) {
        
        this.crearConsultorio = false;
        if (this.consultorio !== con) {
            this.consultorio = con;
            this.obtenerUbicaciones(this.consultorio);
        }
    }

    crearConsultorioBtn() {
        if (this.crearConsultorio === false) {
            this.crearConsultorio = true;
            this.consultorio = new Medico();
        }
        this.consultorioForm.reset();
        
    }
}
