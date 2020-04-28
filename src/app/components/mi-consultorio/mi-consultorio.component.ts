import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion, IUbicacion, Medico, _Medico, Virus, MedicoVirus, Valoracion } from 'src/models';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';
enum ESTADO {
    CREAR = 0,
    EDITAR,
    DETALLE,
}
@Component({
selector: 'app-mi-consultorio',
templateUrl: './mi-consultorio.component.html',
styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
    consultorioForm: FormGroup;
    hayErrores: boolean;
    estadoActual: ESTADO;
    ubicacion: Ubicacion;
    localIcono: IconDefinition;
    consultorio: Medico;
    consultoriosList: Medico[];
    medicosVirus: MedicoVirus[];
    virusList: Virus[];
    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(private sidvi: SIDVIServices) {
        this.localIcono = this.icons.guion;
        this.consultorioForm = new FormGroup({
        nombreDoctor:         new FormControl('', Validators.required),   cedulaProfesional:    new FormControl('', Validators.required),
        nombreConsultorio:    new FormControl('', Validators.required),   telefonoConsultorio:  new FormControl('', Validators.required),
        direccionConsultorio: new FormControl('', Validators.required),   descripcion:          new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        // TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
        this.limpiarTodo();
    }

    limpiarTodo() {
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false});
        this.consultorio = new Medico({fkUsuario: this.sidvi.manager.usuario.idUsuario, estatus: _Medico.Estatus.EN_ESPERA});
        this.estadoActual = ESTADO.CREAR;
        this.hayErrores = false;
        this.consultorio.fkUbicacion = -1;
        this.obtenerConsultoriosList(this.sidvi.manager.usuario.idUsuario);
        this.obtenerVirusList();
        this.medicosVirus = [];
    }

    obtenerConsultoriosList(idUsuario: number) {
        this.sidvi.medico.listarMedicos(idUsuario, null, null, null, null, null, null, null, null)
        .subscribe(res => {
            this.consultoriosList = res.resultados.map((item: any) => new Medico(item)); 
        }, err => { console.log(err); });
    }

    obtenerVirusList() {
        this.sidvi.virus.listarVirus(null, null, null, null, null, null)
        .subscribe(res => {
            this.virusList = res.resultados;
            this.virusList.forEach( v => {v.selected = false; });
        }, err => console.log(err));
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
            if (this.estadoActual === ESTADO.EDITAR && this.consultorio.fkUbicacion === ubi.idUbicacion) {
                ubi.localSelected = true;
            }
            await this.getUbicacionesHijo(ubi);
        }
    }

    ubicacionSelected(idUbicacion: number) {
        this.unselectUbicacion(this.ubicacion, idUbicacion);
        if (this.consultorio.fkUbicacion === idUbicacion) {
            this.consultorio.fkUbicacion = -1;
        } else {
            this.consultorio.fkUbicacion = idUbicacion;
        }
    }

    unselectUbicacion(ubicacion: Ubicacion, idUbicacion: number) {
        if (ubicacion.idUbicacion !== idUbicacion) { ubicacion.localSelected = false; }
        for (const ubi of ubicacion.ubicaciones) {
            this.unselectUbicacion(ubi, idUbicacion);
        }
    }

    seleccionVirus(virus: Virus, event) {
         if (event.target.checked) {
             virus.selected = true;
        } else {
            virus.selected = false;
        }
    }


    obtenerEvaluacion() {
        for (const medicoVirus of this.medicosVirus) {
            let acumValoracion = 0;
            let promedioValoracion = 0;
            this.sidvi.valoracion.listarValoraciones(medicoVirus.idMedicoVirus, null).subscribe(
                res => {
                    if (res.total === 0) {
                        medicoVirus.localPromValoracion = 0;
                        medicoVirus.localTotalValoracion = 0;
                    }   else {
                        const valoraciones: Valoracion[] = res.resultados.map((item: any) => new Valoracion(item));
                        for (const valoracion of valoraciones) {
                            acumValoracion += valoracion.valoracion;
                        }
                        promedioValoracion = acumValoracion / valoraciones.length;
                        medicoVirus.localAcumValoracion = acumValoracion;
                        medicoVirus.localPromValoracion = promedioValoracion;
                        medicoVirus.localTotalValoracion = valoraciones.length;
                    }
                },
                err => {
                    console.log(err);
                }
                );
        }

    }

    obtenerUbicaciones(consultorio: Medico) {
        this.sidvi.ubicacion.obtenerUbicacion( consultorio.fkUbicacion)
            .subscribe(ubi => {
                if (ubi) {
                    this.consultorio.ubicacion = ubi;
                }
            });
    }

    obtenerVirus(consultorio: Medico) {
        this.sidvi.medicoVirus.listarMedicosVirus(consultorio.idMedico, null, null, null, null, null, null)
            .subscribe( res => {
                this.medicosVirus =  res.resultados.map((item: any) => new MedicoVirus(item));
                this.medicosVirus.forEach(v => {
                    this.sidvi.virus.obtenerVirus(v.fkVirus)
                        .subscribe( res => {
                            v.virus = res;
                            v.virus.selected = true;
                        });
                });
                this.obtenerEvaluacion();
            }, err => {console.log(err); });
    }

    verConsultorioBtn(con: Medico) {
        if (this.consultorio.idMedico !== con.idMedico) {
            this.consultorio = new Medico(con);
            this.obtenerUbicaciones(this.consultorio);
            this.obtenerVirus(this.consultorio);
        }
        console.log(this.consultorio);
        this.estadoActual = ESTADO.DETALLE;
    }

    crearConsultorioBtn() {
        if (this.estadoActual !== ESTADO.CREAR) {
            this.estadoActual = ESTADO.CREAR;
            this.consultorio = new Medico({fkUsuario: this.sidvi.manager.usuario.idUsuario, estatus: _Medico.Estatus.EN_ESPERA});
        }
        this.refreshForm();
    }

    refreshForm() {
        this.consultorioForm.reset();
        this.limpiarTodo();
        this.ionViewWillEnter();
    }

    irEditarBtn(con: Medico) {
        this.estadoActual = ESTADO.EDITAR;
        this.ionViewWillEnter();
        this.consultorio = con;
        this.consultorioForm.setValue({
            nombreDoctor: con.nombreDoctor,
            cedulaProfesional: con.cedulaProfesional,
            nombreConsultorio: con.nombreConsultorio,
            telefonoConsultorio: con.telefonoConsultorio,
            direccionConsultorio: con.direccionConsultorio,
            descripcion: con.descripcion
        });
        this.virusList.forEach(v => {
            this.medicosVirus.forEach( mv => {
                if (v.idVirus === mv.virus.idVirus) {
                    v.selected = true;
                }
            });
        });
    }

    handleFileInput(files: FileList) {
        if (files[0] != null) {
            this.consultorio.localFile = files;
            this.consultorio.localFileName = files[0].name;
        }
    }

    registrar() {
        console.log('registrar ' + this.consultorioForm.status );
        if  (this.consultorioForm.status ===  'VALID' && this.consultorio.fkUbicacion !== -1) {
            this.hayErrores = false;
            this.consultorio.ubicacion = null;
            delete this.consultorio.mimetypeFoto;
            delete this.consultorio.archivoFoto;
            console.log(this.consultorio);
            let insertedId;
            let success = true;
            this.sidvi.medico.crearMedico(this.consultorio)
                .subscribe(res => {
                    console.log(res);
                    if (res.type === _APIResponse.TypeEnum.SUCCESS) {
                        insertedId = res.extra.insertedId;
                        if ( this.consultorio.localFile != null ) {
                            this.guardarImagen(insertedId);
                        }
                        this.virusList.forEach(virus => {
                            if (virus.selected !== true) { return; }
                            const medicoVirus = new MedicoVirus({fkMedico: res.extra.insertedId, fkVirus: virus.idVirus});
                            this.sidvi.medicoVirus.crearMedicoVirus(medicoVirus)
                            .subscribe( res2 => {
                                if (res2.type !== _APIResponse.TypeEnum.SUCCESS) {
                                    success = false;
                                }
                            } , err => {console.log(err); });
                        });
                        if (success) {
                            this.obtenerConsultoriosList(this.sidvi.manager.usuario.idUsuario);
                            Swal.fire({title: 'Consultorio registrado correctamente', text: 'Su solicitud fue enviada', icon: 'success', backdrop: false});                 
                        } else {
                            Swal.fire({title: 'Algo salió mal', text: 'Su solicitud no pudo ser enviada, intentelo mas tarde', icon: 'error', backdrop: false});
                        }
                        this.refreshForm();
                    }
            }, err => { console.log(err); });
        } else  {
        this.hayErrores = true;
        }
    }

    guardarImagen(medicoId: number) {
        console.log(this.consultorio.localFile[0]);
        console.log(medicoId);
        this.sidvi.medico.cargarMedicoFoto(medicoId, this.consultorio.localFile[0])
            .subscribe( res => {
                console.log(res);
            }, err => { console.log(err); });
    }

    editar(consultorio: Medico) {
        console.log(consultorio);
        this.sidvi.medico.actualizarMedico(this.consultorio.idMedico, this.consultorio)
            .subscribe( res => {
                console.log(res);
            }, err => { console.log(err); });
    }

    eliminar(consultorio: Medico) {
        this.sidvi.medico.eliminarMedico(consultorio.idMedico)
            .subscribe( res => {
                console.log(res);
                if (res.type === 'SUCCESS') {
                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El consultorio ha sido eliminado',
                        icon: 'success',
                        backdrop: false,
                    });
                    this.obtenerConsultoriosList(this.sidvi.manager.usuario.idUsuario);
                    this.crearConsultorioBtn();
                }
            }, err => {console.log(err); });
    }

    confirmacionParaEliminar(consultorio: Medico) {
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar?',
            text: '¡Esta acción es irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            backdrop: false
          }).then((result) => {
            console.log(result);
            if (result.value) {
                this.eliminar(consultorio);
            }
          });
    }
}
