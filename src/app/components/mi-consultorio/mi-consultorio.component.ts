import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
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
        this.consultorio.medicosVirus = [];
    }

    obtenerConsultoriosList(idUsuario: number) {
        this.sidvi.medico.listarMedicos(idUsuario, null, null, null, null, null, null, null, null)
        .subscribe(res => {
            this.consultoriosList = res.resultados.map((item: any) => new Medico(item));
        }, err => { console.log(err); });
    }

    obtenerVirusList(idMedico?: number) {
        this.sidvi.virus.listarVirus(null, null, null, null, null, null)
        .subscribe(res => {
            this.virusList = [];
            res.resultados.forEach(
                v => {
                    if (idMedico) {
                        this.consultorio.medicosVirus.forEach( mv => {
                            if (mv.fkVirus === v.idVirus) {
                                v.selected = true;
                            }
                        });
                    } else {
                        v.selected = false;
                    }
                    this.virusList.push(new Virus(v));
                });
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
            if (this.estadoActual === ESTADO.DETALLE && this.consultorio.fkUbicacion === ubi.idUbicacion) {
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
        if (event.target.checked) { virus.selected = true;
        } else { virus.selected = false; }
    }

    obtenerEvaluacion() {
        for (const medicoVirus of this.consultorio.medicosVirus) {
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

    obtenerUbicacionConsultorio(consultorio: Medico) {
        this.sidvi.ubicacion.obtenerUbicacion( consultorio.fkUbicacion)
            .subscribe(ubi => {
                if (ubi) {
                    this.consultorio.ubicacion = ubi;
                    this.getUbicacionesHijo(this.ubicacion);
                }
            });
    }

    obtenerMedicoVirus(consultorio: Medico) {
        this.sidvi.medicoVirus.listarMedicosVirus(consultorio.idMedico, null, null, null, null, null, null)
            .subscribe( res => {
                this.consultorio.medicosVirus =  res.resultados.map((item: any) => new MedicoVirus(item));
                this.consultorio.medicosVirus.forEach(mv => {
                    this.sidvi.virus.obtenerVirus(mv.fkVirus)
                    .subscribe( v => {
                        mv.virus = v;
                        mv.virus.selected = true;
                        this.obtenerVirusList(consultorio.idMedico); //mover fuera del loop
                    });
                });
                this.obtenerEvaluacion();
            } , err => { console.log(err); });
    }

    verConsultorioBtn(con: Medico) {
        if (this.consultorio.idMedico !== con.idMedico) {
            this.consultorio = new Medico(con);
            this.obtenerUbicacionConsultorio(this.consultorio);
            this.obtenerMedicoVirus(this.consultorio);
        }
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

    handleFileInput(files: FileList) {
        if (files[0] != null) {
            this.consultorio.localFile = files;
            this.consultorio.localFileName = files[0].name;
        }
    }

    guardarImagen(medicoId: number) {
        this.sidvi.medico.cargarMedicoFoto(medicoId, this.consultorio.localFile[0])
            .subscribe( res => { console.log(res);
            }, err => { console.log(err); });
    }

    registrar() {
        console.log('registrar ' + this.consultorioForm.status );
        const canProceed = this.checkForm();
        if (!canProceed) { return; }
        let success = true;
        this.sidvi.medico.crearMedico(this.consultorio)
            .subscribe(res => {
                if (res.type === _APIResponse.TypeEnum.SUCCESS) {
                    if ( this.consultorio.localFile != null ) {
                        this.guardarImagen(res.extra.insertedId);
                    }
                    this.virusList.forEach(virus => {
                        if (virus.selected !== true) { return; }
                        const medicoVirus = new MedicoVirus({fkMedico: res.extra.insertedId, fkVirus: virus.idVirus});
                        this.sidvi.medicoVirus.crearMedicoVirus(medicoVirus)
                            .subscribe( res2 => {
                                if (res2.type !== _APIResponse.TypeEnum.SUCCESS) {
                                    success = false;
                                }
                            } , err => { console.log(err); });
                    });
                    this.showMsg(success, 'Consultorio registrado', 'Los cambios han sido guardados' );
                }
            }, err => {
                console.log(err);
                this.showMsg(false, 'Consultorio registrado', 'Los cambios han sido guardados' );
            });
    }

    editar(consultorio: Medico) {
        const canProceed = this.checkForm();
        if (!canProceed) { return; }
        let success = true;
        this.sidvi.medico.actualizarMedico(this.consultorio.idMedico, this.consultorio)
            .subscribe( res => {
                if (res.type === _APIResponse.TypeEnum.SUCCESS) {
                    if ( this.consultorio.localFile != null ) {
                            this.guardarImagen(this.consultorio.idMedico);
                    }
                    this.virusList.forEach( v => {
                        let idMV = -1;
                        let isInMV; isInMV = false;
                        this.consultorio.medicosVirus.forEach( mv => {
                            if (v.idVirus === mv.fkVirus) {
                                isInMV = true;
                                idMV = mv.idMedicoVirus;
                            }
                        });
                        if (this.decisionVirus(isInMV, idMV, v) === false) {
                            success = false;
                        }
                    });
                    this.showMsg(success, 'Consultorio editado', 'Los cambios han sido guardados' );
                }
            }, err => { console.log(err); this.showMsg(false, 'Consultorio registrado', 'Su solicitud fue enviada'); });
    }

    decisionVirus(isInMVList: boolean,  idMV: number, virus: Virus) {
        let success = true;
        if (isInMVList === false && virus.selected === true) { // Agregar relacion de Medico Virus
            console.log('agregando ' + virus.nombre);
            const newMV = new MedicoVirus({fkMedico: this.consultorio.idMedico, fkVirus: virus.idVirus});
            this.sidvi.medicoVirus.crearMedicoVirus(newMV)
                .subscribe( resMV => {
                    console.log(resMV);
                }, err => {success = false; });
        } else if (isInMVList === true && (virus.selected === false || virus.selected == null) ) {  // Eliminar relacion de Medico Virus
            console.log('eliminando ' + virus.nombre);
            this.sidvi.medicoVirus.eliminarMedicoVirus(idMV)
                .subscribe( resMV => {
                    console.log(resMV);
                }, err => { success = false; });
        } else {
                console.log('no le hago nada a ' + virus.nombre);
        }
        return success;
    }

    checkForm() {
        if  (this.consultorioForm.status ===  'VALID' && this.consultorio.fkUbicacion !== -1) {
            this.hayErrores = false;
            delete this.consultorio.mimetypeFoto;
            delete this.consultorio.archivoFoto;
            return true;
        } else {
            this.hayErrores = true;
            return false;
        }
    }

    showMsg(success: boolean, titleMsg: string, textMsg: string) {
        if (success) {
            this.obtenerConsultoriosList(this.sidvi.manager.usuario.idUsuario);
            Swal.fire({title: titleMsg, text: textMsg, icon: 'success', backdrop: false});
        } else {
            Swal.fire({title: 'Algo salió mal', text: 'Por favor intentelo más tarde', icon: 'error', backdrop: false});
        }
        this.refreshForm();
    }

    eliminar(consultorio: Medico) {
        this.sidvi.medico.eliminarMedico(consultorio.idMedico)
            .subscribe( res => {
                if (res.type === _APIResponse.TypeEnum.SUCCESS) {
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
            if (result.value) {
                this.eliminar(consultorio);
            }
          });
    }
}
