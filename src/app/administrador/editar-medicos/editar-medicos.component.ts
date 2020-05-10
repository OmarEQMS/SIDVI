import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico, _Medico } from 'src/models';
import { SIDVIServices, Defaults } from 'src/api';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editar-medicos',
    templateUrl: './editar-medicos.component.html',
    styleUrls: ['./editar-medicos.component.scss'],
})
export class EditarMedicosComponent implements OnInit {

    @ViewChild('basicModal', { static: true }) basicModal: ModalContainerComponent;
    medicos: Medico[] = [new Medico()];
    elements: any = [];
    medicoModal: Medico;

    constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) {
        this.medicoModal = new Medico();
    }

    ngOnInit() {
        this.listarMedicos();
    }

    private listarMedicos() {
        this.sidvi.medico.listarMedicos(undefined, undefined, undefined, undefined, undefined, 'estatus').subscribe(medicos => {
            this.medicos = medicos.resultados.map((item: any) => new Medico(item));
            for (const medico of this.medicos) {
                if (Defaults.allowBase64Types.includes(medico.mimetypeFoto)) {
                    medico.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(medico.archivoFoto as string);
                }
            }
        }, error => {
            console.error(error);
        });
    }

    detallesModal(idMedico) {
        this.sidvi.medico.obtenerMedico(idMedico).subscribe(
            medico => {
                this.medicoModal = new Medico(medico);
            }, error => {
                console.error(error);
            }
        );
    }

    aceptarConsultorio() {
        this.medicoModal.estatus = _Medico.Estatus.HABILITADO;
        this.actualizarConsultorio('habilitado');
    }

    deshabilitarConsultorio() {
        this.medicoModal.estatus = _Medico.Estatus.DESHABILITADO;
        this.actualizarConsultorio('deshabilitado');
    }

    rechazarConsultorio() {
        this.medicoModal.estatus = _Medico.Estatus.RECHAZADO;
        this.actualizarConsultorio('rechazado');
    }

    actualizarConsultorio(mensaje) {
        this.sidvi.medico.actualizarMedico(this.medicoModal.idMedico, this.medicoModal).subscribe(
            res => {

                Swal.fire({ title: '¡Listo!', text: 'Consultorio ' + mensaje + ' correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.listarMedicos();
                        this.basicModal.hide();
                    }
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    eliminarConsultorio() {

        // Mostrar mensaje de confirmación
        Swal.fire({
            title: 'Confirmación',
            text: '¿Estás seguro que quieres eliminar este consultorio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
            heightAuto: false
        }).then((result) => {
            if (result.value) {
                this.sidvi.medico.eliminarMedico(this.medicoModal.idMedico).subscribe(
                    res => {

                        Swal.fire({ title: '¡Listo!', text: 'Consultorio eliminado correctamente', icon: 'success', heightAuto: false }).then((resultado) => {
                            if (resultado.value) {
                                this.listarMedicos();
                                this.basicModal.hide();
                            }
                        });
                    },
                    error => {
                        console.error(error);
                    }
                );
            }
        });
    }
}
