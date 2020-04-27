import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion, IUbicacion, Medico, _Medico, Virus, MedicoVirus, Valoracion } from 'src/models';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
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
    ubiName: string;
    localIcono: IconDefinition;
    consultoriosList: Medico[];
    medicosVirus: MedicoVirus[];
    consultorio: Medico;
    virusList: Virus[];
    virusSelected: Virus[] = [];
    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(private sidvi: SIDVIServices) {
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false});
        this.hayErrores = false;
        this.localIcono = this.icons.guion;
        this.consultorio = new Medico({fkUsuario: sidvi.manager.usuario.idUsuario, estatus: _Medico.Estatus.EN_ESPERA});
        this.consultorioForm = new FormGroup({
        nombreDoctor:         new FormControl('', Validators.required),   cedulaProfesional:    new FormControl('', Validators.required),
        nombreConsultorio: new FormControl('', Validators.required),   telefonoConsultorio:  new FormControl('', Validators.required),
        direccionConsultorio: new FormControl('', Validators.required), descripcion: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        // TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
        this.estadoActual = ESTADO.CREAR;
        this.obtenerConsultorios();
        this.sidvi.virus.listarVirus(null, null, null, null, null, null)
        .subscribe(res => {
            this.virusList = res.resultados;
        }, err => console.log(err));
        this.consultorio.fkUbicacion = -1;
    }

    obtenerConsultorios() {
        this.sidvi.medico.listarMedicos(this.sidvi.manager.usuario.idUsuario, null, null, null, null, null, null, null, null)
            .subscribe(res => {
            this.consultoriosList = res.resultados;
            console.log(this.consultoriosList);
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
            this.virusSelected.push(virus);
        } else {
            const index = this.virusSelected.indexOf(virus, 0);
            if (index > -1) {
                this.virusSelected.splice(index, 1);
            }
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
                    this.ubiName = ubi.nombre;
                }
            });
    }

    obtenerVirus(consultorio: Medico) {
        this.sidvi.medicoVirus.listarMedicosVirus(consultorio.idMedico)
            .subscribe( res => {
                this.medicosVirus =  res.resultados.map((item: any) => new MedicoVirus(item));
                this.obtenerEvaluacion();
                console.log(this.medicosVirus);
            }, err => {console.log(err); });
    }

    verConsultorioBtn(con: Medico) {
        this.estadoActual = ESTADO.DETALLE;
        if (this.consultorio !== con) {
            this.consultorio = con;
            this.obtenerUbicaciones(this.consultorio);
            this.obtenerVirus(this.consultorio);
        }
    }

    crearConsultorioBtn() {
        if (this.estadoActual !== ESTADO.CREAR) {
            this.estadoActual = ESTADO.CREAR;
            this.consultorio = new Medico({fkUsuario: this.sidvi.manager.usuario.idUsuario, estatus: _Medico.Estatus.EN_ESPERA});
        }
        this.consultorioForm.reset();
    }

    irEditarBtn(con: Medico) {
        this.crearConsultorioBtn();
        this.consultorio = con;
        this.consultorioForm.setValue({
            nombreDoctor: con.nombreDoctor,
            cedulaProfesional: con.cedulaProfesional,
            nombreConsultorio: con.nombreConsultorio,
            telefonoConsultorio: con.telefonoConsultorio,
            direccionConsultorio: con.direccionConsultorio,
            descripcion: con.descripcion
        });
        this.estadoActual = ESTADO.EDITAR;
    }

    registrar() {
        console.log(this.consultorio.fkUbicacion);
        console.log('registrar ' + this.consultorioForm.status );
        if  (this.consultorioForm.status ===  'VALID' && this.consultorio.fkUbicacion !== -1) {
            this.hayErrores = false;
            this.consultorio.mimetypeFoto = null;
            this.consultorio.archivoFoto = null;
            console.log(this.consultorio);
            this.sidvi.medico.crearMedico(this.consultorio)
                .subscribe(res => {
                    console.log(res);
                    if (res.type === 'SUCCESS') {
                        let success = true;
                        this.virusSelected.forEach(virus => {
                            const medicoVirus = new MedicoVirus({fkMedico: res.extra.insertedId, fkVirus: virus.idVirus});
                            this.sidvi.medicoVirus.crearMedicoVirus(medicoVirus)
                            .subscribe( res2 => {
                                if (res2.type !== 'SUCCESS') {
                                    success = false;
                                }
                            } , err => {console.log(err); });
                        });
                        if (success) {
                            console.log('CONSULTORIO GUARDADO EXITOSAMENTE');
                            this.obtenerConsultorios();
                            Swal.fire({title: 'Consultorio registrado correctamente', text: 'Su solicitud fue enviada', icon: 'success', backdrop: false});
                        } else {
                            Swal.fire({title: 'Algo salió mal', text: 'Su solicitud no pudo ser enviada, intentelo mas tarde', icon: 'success', backdrop: false});
                        }
                        this.consultorioForm.reset();
                    }
            }, err => { console.log(err); });
        } else  {
        this.hayErrores = true;
        }
    }

    editar(consultorio: Medico) {

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
                    this.obtenerConsultorios();
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
