import { Component, OnInit, ViewChild } from '@angular/core';
import { Virus, Usuario } from 'src/models';
import { SIDVIServices } from 'src/api';
import { IconDefinition, faSignOutAlt, faVirus, faUser, faEdit, faBell, faUsers } from '@fortawesome/free-solid-svg-icons';
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
    usuario: Usuario;
    idUsuario: number;

    icons: { [id: string]: IconDefinition } = {
        close: faSignOutAlt,
        virus: faVirus,
        user: faUser,
        edit: faEdit,
        bell: faBell,
        users: faUsers
    };

    constructor(
        private sidvi: SIDVIServices,
        private router: Router
    ) {
        this.viruss = new Array(0);
        this.newVirus = new Virus();
        this.newVirus.localFileName = 'Choose file';
        this.usuario = new Usuario(); // se inicializa para que no marque error antes de que asigne el usuario.
    }

    ngOnInit() { }

    ionViewWillEnter() {
        this.idUsuario = this.sidvi.manager.usuario.idUsuario;
        this.sidvi.manager.updateMain.subscribe(
            state => {
                this.cargarListaVirus();
            }
        );
        this.sidvi.manager.updateUser.subscribe(
            state => {
                this.obtenerUsuario(this.idUsuario);
            }
        );

        this.cargarListaVirus();
        this.obtenerUsuario(this.idUsuario);
    }

    cargarListaVirus() {
        this.sidvi.virus.listarVirus().subscribe(
            viruss => {
                this.viruss = viruss.resultados.map((item: any) => new Virus(item));
            });
    }

    obtenerUsuario( id: number ) {
        this.sidvi.usuario.obtenerUsuario(id)
        .subscribe(
          res => {
            this.usuario = new Usuario(res);
            this.usuario.localFileName = 'Seleccione una nueva imagen';
            }, err => { console.log(err); }
          );
      }

    abrirPerfil() {
        this.router.navigate(['./administrador/perfil/']);
    }

    abrirVirus(virus: Virus) {
        this.router.navigate(['./administrador/virus/' + virus.idVirus]);
    }

    abrirInformacion(virus: Virus) {
        this.router.navigate(['./administrador/virus/' + virus.idVirus + '/informacion']);
    }

    abrirEstadistica(virus: Virus) {
        this.router.navigate(['./administrador/virus/' + virus.idVirus + '/estadistica']);
    }
    abrirMedicos(virus: Virus) {
        this.router.navigate(['./administrador/virus/' + virus.idVirus + '/medicos']);
    }

    abrirTest(virus: Virus) {
        this.router.navigate(['./administrador/listarPreguntas/' + virus.idVirus ]);
    }

    abrirCatalogo(area: string) {
        this.router.navigate(['./administrador/catalogos/' + area]);
    }

    abrirConsultorios() {
        this.router.navigate(['./administrador/consultorios/']);
    }

    cerrarSesion() {
        localStorage.clear();
        this.router.navigate(['./login']);
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

    abrirAdministradores() {

    }

    abrirUsuarios() {
        
    }

}
