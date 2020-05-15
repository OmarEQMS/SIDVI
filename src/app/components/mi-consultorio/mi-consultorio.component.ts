import { Component, OnInit, RendererStyleFlags2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion, IUbicacion, Medico, _Medico, Virus, MedicoVirus, Valoracion } from 'src/models';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';
@Component({
    selector: 'app-mi-consultorio',
    templateUrl: './mi-consultorio.component.html',
    styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
    editando: boolean;
    consultorio: Medico; // el consultorio actual
    ubicacion: Ubicacion;
    consultoriosList: Medico[]; // all consultorios of this user
    virusList: Virus[]; // all existing virus
    fieldValidations = {
        'nombreConsultorio' : true,
        'nombreDoctor': true,
        'direccionConsultorio': true,
        'telefonoConsultorio': true,
        'cedulaProfesional': true,
        'descripcion': true,
        'ubicacion':true
      };
    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };
    localIcono: IconDefinition;

    constructor(private sidvi: SIDVIServices) {
        this.editando = false;
        this.localIcono = this.icons.guion;
    }

    ngOnInit() {
        // TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
        this.clearAll();
    }

    clearAll() {
        this.obtenerConsultoriosList(this.sidvi.manager.usuario.idUsuario);
        this.obtenerVirusList();
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false});
        this.consultorio = new Medico({fkUsuario: this.sidvi.manager.usuario.idUsuario, fkUbicacion: -1, estatus: _Medico.Estatus.EN_ESPERA});
        this.consultorio.ubicacion = new Ubicacion();
        this.consultorio.medicosVirus = [];
        this.consultorio.viruss = [];
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
            if (this.editando && this.consultorio.fkUbicacion === ubi.idUbicacion) {
                ubi.localSelected = true;
            }
            await this.getUbicacionesHijo(ubi);
        }
    }

    obtenerConsultoriosList(idUsuario: number) {
        this.sidvi.medico.listarMedicos(idUsuario, null, null, null, null, null, null, null, null)
        .subscribe(res => {
            this.consultoriosList = res.resultados.map((item: any) => new Medico(item));
            this.consultoriosList.forEach( con => {
                // ubicacion
                this.sidvi.ubicacion.obtenerUbicacion(con.fkUbicacion).subscribe( ubi => { con.ubicacion = new Ubicacion(ubi); });
                // medicosVirus
                this.sidvi.medicoVirus.listarMedicosVirus(con.idMedico).subscribe( mv => {
                    con.medicosVirus = mv.resultados.map((item: any) => new MedicoVirus(item));
                    con.medicosVirus.forEach( mvList => {
                        this.sidvi.virus.obtenerVirus(mvList.fkVirus)
                            .subscribe( v => {
                                mvList.virus = v;
                                mvList.virus.selected = true;
                            });
                    });
                });
            } );
        }, err => { console.log(err); });
    }

    obtenerVirusList() {
        this.sidvi.virus.listarVirus(null, null, null, null, null, null)
        .subscribe(res => {
            this.virusList = res.resultados.map((item: any) => new Virus(item));
            this.virusList.forEach(v => {
                this.consultorio.medicosVirus.forEach( mv => {
                    if (mv.fkVirus === v.idVirus) {
                        v.selected = true;
                    }
                });
            });
        }, err => console.log(err));
    }


    ubicacionSelected(ubi: Ubicacion) {
        this.unselectUbicacion(this.ubicacion, ubi.idUbicacion);
        this.consultorio.fkUbicacion = ubi.idUbicacion;
        this.consultorio.ubicacion = ubi;
        this.fieldValidations.ubicacion = true;
    }

    unselectUbicacion(ubicacion: Ubicacion, idUbicacion: number) {
        ubicacion.localSelected = (ubicacion.idUbicacion !== idUbicacion) ? false : true;
        for (const ubi of ubicacion.ubicaciones) {
            this.unselectUbicacion(ubi, idUbicacion);
        }
    }

    virusSelected(virus: Virus, event) {
        virus.selected = (event.target.checked) ? true : false;
        if (virus.selected) { // add it to consultorio.virus array
            this.consultorio.viruss.push(virus);
        } else { // remove it from consultorio.virus array
            for ( let i = 0; i < this.consultorio.viruss.length; i++ ) {
                if (this.consultorio.viruss[i] === virus) {
                    this.consultorio.viruss.splice(i, 1);
                }
            }
        }
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
                }, err => { console.log(err); }
            );
        }
    }

    verConsultorioBtn(con: Medico) {
        this.editando = true;
        this.consultorio = con;
        this.obtenerVirusList();
        this.obtenerEvaluacion();
        this.getUbicacionesHijo(this.ubicacion);
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

    guardarVirus(idMedico: number) {
        this.consultorio.viruss.forEach(virus => {
            const medicoVirus = new MedicoVirus({fkMedico: idMedico, fkVirus: virus.idVirus});
            this.sidvi.medicoVirus.crearMedicoVirus(medicoVirus)
                .subscribe( res => {
                } , err => { console.log(err); });
        });
    }

    validateField(key, input) {
        this.fieldValidations[key] = (input === '' || input === undefined) ? false : true;
    }

    validateAll() {
        let valid = true;
        // already validated
        if (this.fieldValidations.nombreConsultorio === false) {
          valid = false;
        } else if ( this.fieldValidations.nombreDoctor === false) {
          valid = false;
        } else if ( this.fieldValidations.direccionConsultorio === false) {
          valid = false;
        } else if (this.fieldValidations.telefonoConsultorio === false) {
          valid = false;
        } else if (this.fieldValidations.cedulaProfesional === false) {
            valid = false;
        } else if (this.fieldValidations.descripcion === false) {
            valid = false;
        }

        // specific validations
        if (this.consultorio.fkUbicacion === -1) {
            this.fieldValidations.ubicacion = false;
            valid = false;
        } else {
            this.fieldValidations.ubicacion = true;
        }
        return valid;
    }

    crearConsultorioBtn() {
        this.editando = false;
        this.clearAll();
        this.ionViewWillEnter();
    }

    registrarBtn() {
        this.validateField('nombreConsultorio', this.consultorio.nombreConsultorio);
        this.validateField('nombreDoctor', this.consultorio.nombreDoctor);
        this.validateField('direccionConsultorio', this.consultorio.direccionConsultorio);
        this.validateField('telefonoConsultorio', this.consultorio.telefonoConsultorio);
        this.validateField('cedulaProfesional', this.consultorio.cedulaProfesional);
        this.validateField('descripcion', this.consultorio.descripcion);
        if (this.validateAll() === false) { return; }
        this.registrar();
    }

    registrar() {
        delete this.consultorio.mimetypeFoto;
        delete this.consultorio.archivoFoto;
        this.sidvi.medico.crearMedico(this.consultorio)
            .subscribe( res => {
                if ( this.consultorio.localFile != null ) {
                    this.guardarImagen(res.extra.insertedId);
                }
                this.guardarVirus(res.extra.insertedId);
                this.crearConsultorioBtn();
                Swal.fire({title: 'Felicitaciones', text: 'Su consultorio se ha guardado', icon: 'success', backdrop: false});
            }, err => {
                console.log(err);
                Swal.fire({title: 'Algo salió mal', text: 'Por favor intentelo más tarde', icon: 'error', backdrop: false});
        } );
    }

    editar(con: Medico) {
        console.log(this.consultorio);
        console.log(this.virusList);
        if (this.validateAll() === false) { return; }
        delete this.consultorio.mimetypeFoto;
        delete this.consultorio.archivoFoto;
        this.consultorio.estatus = _Medico.Estatus.EN_ESPERA;
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
                    this.decisionVirus(isInMV, idMV, v);
                });
                this.crearConsultorioBtn();
                Swal.fire({title: 'Consultorio editado', text: 'Los cambios han sido guardados', icon: 'success', backdrop: false});
            }
        }, err => {
            console.log(err);
            Swal.fire({title: 'Algo salió mal', text: 'Por favor intentelo más tarde', icon: 'error', backdrop: false});
        });
    }

    decisionVirus(isInMVList: boolean,  idMV: number, virus: Virus) {
        if (isInMVList === false && virus.selected === true) { // Agregar relacion de Medico Virus
            console.log('agregando ' + virus.nombre);
            const newMV = new MedicoVirus({fkMedico: this.consultorio.idMedico, fkVirus: virus.idVirus});
            this.sidvi.medicoVirus.crearMedicoVirus(newMV)
                .subscribe( resMV => {
                    console.log(resMV);
                });
        } else if (isInMVList === true && (virus.selected === false || virus.selected == null) ) {  // Eliminar relacion de Medico Virus
            console.log('eliminando ' + virus.nombre);
            this.sidvi.medicoVirus.eliminarMedicoVirus(idMV)
                .subscribe( resMV => {
                    console.log(resMV);
                });
        } else {
                console.log('no le hago nada a ' + virus.nombre);
        }
    }

    habilitarConsultorio(habilitado: boolean) {
        this.sidvi.medico.obtenerMedico(this.consultorio.idMedico).subscribe( con => {
            let consultorio = new Medico(con);
            if (habilitado) { consultorio.estatus = _Medico.Estatus.HABILITADO; }
            else {  consultorio.estatus = _Medico.Estatus.DESHABILITADO; }
            this.sidvi.medico.actualizarMedico(this.consultorio.idMedico, consultorio).subscribe(res => {
                this.consultorio.estatus = consultorio.estatus;
            });
        });
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
            if (result.value) { this.eliminar(consultorio); }
          });
    }
}
