import { Component, OnInit, ViewChild, ɵsetCurrentInjector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SIDVIServices, Defaults, ContentTypeEnum, ManagerService } from 'src/api';
import { Medico, MedicoVirus, Ubicacion, IUbicacion, Valoracion, Virus, _Medico, Usuario } from 'src/models';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { async } from '@angular/core/testing';
import { MDBModalRef } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';

@Component({
    selector: 'app-medico-virus-list',
    templateUrl: './medico-virus-list.component.html',
    styleUrls: ['./medico-virus-list.component.scss'],
})
export class MedicoVirusListComponent implements OnInit {
    @ViewChild('modalEvaluarMedico', null) modalEvaluarMedico: MDBModalRef;

    medicosVirus: MedicoVirus[];
    idVirus: number;
    nombre: string;
    ubicacion: Ubicacion;
    ubicacionesIds: number[];
    localMedVirus: MedicoVirus;
    valoracion: Valoracion;
    valoracionUsuario: number;
    valoraciones: Valoracion[];
    acumValoracion: number;
    promedioValoracion: number;
    yaEvaluo: boolean;
    localIdValoracion: number;

    // tarjeta
    virus: Virus;


    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
            private sidvi: SIDVIServices,
            private activatedRoute: ActivatedRoute,
            private sanitizer: DomSanitizer,
            private router: Router
    ) {
        this.ubicacion = new Ubicacion({ idUbicacion: -1 } as IUbicacion);
        this.localMedVirus = new MedicoVirus();
        this.localMedVirus.medico = new Medico();
        this.yaEvaluo = false;
        this.acumValoracion = 0;
        this.promedioValoracion = 0;
        this.virus = new Virus();
        this.medicosVirus = new Array();
    }

    ngOnInit() { }
    async ionViewWillEnter() {
        this.ubicacionesIds = null;
        this.nombre = null;
        await this.getUbicacionesHijo(this.ubicacion);
        this.filtraUbicaciones();

    }


    filtrar() {
        this.ubicacionesIds = new Array(0);
        this.collectIds(this.ubicacion);
        console.log(this.ubicacionesIds);
        this.filtraUbicaciones();
    }

    collectIds(ubicacion: Ubicacion) {
        if (ubicacion.localSelected) {
            this.ubicacionesIds.push(ubicacion.idUbicacion);
        }
        if (ubicacion.ubicaciones == null) { return; }
        for (const ubi of ubicacion.ubicaciones) {
            this.collectIds(ubi);
        }
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

    filtraUbicaciones() {
        console.log("filtro");
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.obtenerVirus(this.idVirus);
        this.sidvi.medicoVirus.listarMedicosVirus(null, this.idVirus, this.nombre, this.ubicacionesIds, _Medico.Estatus.HABILITADO).subscribe(
        res => {
            this.medicosVirus = res.resultados.map((item: any) => new MedicoVirus(item));
            this.obtenerEvaluacion();
            for (const medicoVirus of this.medicosVirus) {

                // obtener la imagen del medico
                if (medicoVirus.medico.archivoFoto != null) {
                    medicoVirus.medico.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl( medicoVirus.medico.archivoFoto as string);
                }

                // Obtener los virus con los que tiene experiencia el medico
                this.sidvi.medicoVirus.listarMedicosVirus(medicoVirus.medico.idMedico)
                .subscribe( mv => {
                    mv.resultados.forEach(el => {
                        this.sidvi.virus.obtenerVirus(el.fkVirus)
                            .subscribe( v => {
                                if ( v.idVirus !== this.idVirus) {
                                    medicoVirus.medico.viruss.push(v);
                                }
                            });
                    });
                });

                // obtener la ubicacion del medico
                this.sidvi.ubicacion.obtenerUbicacion(medicoVirus.medico.fkUbicacion)
                    .subscribe( ubi => {
                        medicoVirus.medico.ubicacion = new Ubicacion(ubi);
                    });

                // obtener la imagen del usuario del medico
                this.sidvi.usuario.obtenerUsuario(medicoVirus.medico.fkUsuario)
                .subscribe( usu => {
                    medicoVirus.medico.usuario = new Usuario(usu);
                });
                // console.log(medicoVirus);
            }
        },
        err => { console.log(err); });
    }

    obtenerVirus(id: number) {
        this.sidvi.virus.obtenerVirus(id).subscribe(v => { this.virus = new Virus(v); });
    }

    evaluarMedico(valor: number) {
        this.valoracionUsuario = valor;
    }

    enviarEvaluacion() {
        this.valoracion = new Valoracion({
            fkMedicoVirus: this.localMedVirus.idMedicoVirus,
            fkUsuario: this.sidvi.manager.usuario.idUsuario,
            valoracion: this.valoracionUsuario
        });
        if (this.yaEvaluo) {
            this.sidvi.valoracion.actualizarValoracion(this.localIdValoracion, this.valoracion).subscribe(
                res => {
                    this.modalEvaluarMedico.hide();
                    Swal.fire({title: 'Valoración registrada correctamente', icon: 'success', backdrop: false});
                    this.obtenerEvaluacion();
                },
                err => {
                    console.log(err);
                    Swal.fire({title: 'La valoración no se pudo registrar con éxito', icon: 'error', backdrop: false});
                }
                );
        } else {
            this.sidvi.valoracion.crearValoracion(this.valoracion).subscribe(
                res => {
                    this.modalEvaluarMedico.hide();
                    Swal.fire({title: 'Valoración registrada correctamente', icon: 'success', backdrop: false});
                    this.obtenerEvaluacion();
                },
                err => {
                    console.log(err);
                    Swal.fire({title: 'La valoración no se pudo registrar con éxito', icon: 'error', backdrop: false});
                }
                );
        }

    }

    redireccion() {
        if (this.sidvi.manager.usuario == null) {
            Swal.fire({title: 'Primero debes iniciar sesión', icon: 'error', backdrop: false});
            this.router.navigate(['login']);
            this.modalEvaluarMedico.hide();
        } else {
            this.obtenerEvaluacionModal();
        }
    }


    obtenerEvaluacionModal() {
        this.sidvi.valoracion.listarValoraciones(this.localMedVirus.idMedicoVirus, this.sidvi.manager.usuario.idUsuario).subscribe(
            res => {
                if (res.total === 0) {
                    this.valoracionUsuario = 0;
                    this.yaEvaluo = false;
                } else {
                    this.valoracionUsuario = res.resultados[0].valoracion;
                    this.localIdValoracion = res.resultados[0].idValoracion;
                    this.yaEvaluo = true;
                    console.log(this.valoracionUsuario);
                    console.log(this.localIdValoracion);
                }
            },
            err => {
                console.log(err);
            }
            );
    }

    obtenerEvaluacion() {
        for (const medicoVirus of this.medicosVirus) {
            this.acumValoracion = 0;
            this.promedioValoracion = 0;
            this.sidvi.valoracion.listarValoraciones(medicoVirus.idMedicoVirus, null).subscribe(
                res => {
                    if (res.total === 0) {
                        medicoVirus.localPromValoracion = 0;
                        medicoVirus.localTotalValoracion = 0;
                    }   else {
                        this.valoraciones = res.resultados.map((item: any) => new Valoracion(item));
                        for (const valoracion of this.valoraciones) {
                            this.acumValoracion += valoracion.valoracion;
                        }
                        this.promedioValoracion = this.acumValoracion / this.valoraciones.length;
                        medicoVirus.localAcumValoracion = this.acumValoracion;
                        medicoVirus.localPromValoracion = this.promedioValoracion;
                        medicoVirus.localTotalValoracion = this.valoraciones.length;
                    }

                },
                err => {
                    console.log(err);
                }
                );
        }

    }

    otrosVirus() {

    }
}
