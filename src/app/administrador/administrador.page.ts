import { Component, OnInit, ViewChild } from '@angular/core';
import { Virus } from 'src/models';
import { SIDVIServices } from 'src/api';
import { IconDefinition, faSignOutAlt, faVirus, faUser, faEdit, faBell } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ModalContainerComponent } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-administrador',
    templateUrl: './administrador.page.html',
    styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

    @ViewChild('basicModal', { static: true }) basicModal: ModalContainerComponent;
    viruss: Virus[];
    newVirus: Virus;

    icons: { [id: string]: IconDefinition } = {
        close: faSignOutAlt,
        virus: faVirus,
        user: faUser,
        edit: faEdit,
        bell: faBell
    };

    constructor(
        private sidvi: SIDVIServices,
        private router: Router
    ) {
        this.viruss = new Array(0);
        this.newVirus = new Virus();
        this.newVirus.localFileName = 'Choose file';
    }

    ngOnInit() { }

    ionViewWillEnter() {
        this.sidvi.manager.updateMain.subscribe(
            state => {
                this.cargarListaVirus();
            }
        );

        this.cargarListaVirus();
    }

    cargarListaVirus() {
        this.sidvi.virus.listarVirus().subscribe(
            viruss => {
                this.viruss = viruss.resultados.map((item: any) => new Virus(item));
            });
    }

    abrirPerfil() {
        this.router.navigate(['./administrador/perfil/']);
    }

    abrirVirus(virus: Virus) {
        this.router.navigate(['./administrador/virus/' + virus.idVirus]);
    }

    abrirCatalogo(area: string) {
        this.router.navigate(['./administrador/catalogos/' + area]);
    }

    abrirConsultorios() {
        this.router.navigate(['./administrador/consultorios/']);
    }

    cerrarSesion() {
        localStorage.clear();
    }

    handleAddFileInput(files: FileList) {
        if (files[0] != null) {
            this.newVirus.localFile = files;
            this.newVirus.localFileName = files[0].name;
        }
    }

    agregarVirus() {
        this.sidvi.virus.crearVirus(this.newVirus).subscribe(
            res => {
                // Checar si subió un doc
                if (this.newVirus.localFile != null) {
                    this.agregarVirusArchivo(res.extra.insertedId);
                    return;
                }

                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Virus agregado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.cargarListaVirus();
                        this.resetModal();
                    }
                });
            },
            error => {
                console.error(error);
            }
        );
    }
    agregarVirusArchivo(idVirus: any) {

        delete this.newVirus.archivoIcono;
        delete this.newVirus.mimetypeIcono;

        this.sidvi.virus.cargarVirusIcono(idVirus, this.newVirus.localFile[0]).subscribe(
            res => {
                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Virus agregado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.cargarListaVirus();
                        this.resetModal();
                    }
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    resetModal() {
        this.basicModal.hide();
        this.newVirus.nombre = '';
        this.newVirus.clave = '';
        this.newVirus.localFileName = 'Choose file';
        this.newVirus.localFile = null;
    }

}
