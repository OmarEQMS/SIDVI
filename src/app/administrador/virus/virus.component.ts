import { Component, OnInit } from '@angular/core';
import { SIDVIServices, Defaults } from 'src/api';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Virus, Informacion } from 'src/models';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';

@Component({
    selector: 'app-virus',
    templateUrl: './virus.component.html',
    styleUrls: ['./virus.component.scss'],
})
export class VirusComponent implements OnInit {

    idVirus: number;
    virus: Virus;

    constructor(private sidvi: SIDVIServices, private router: Router,
                private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
        this.virus = new Virus();
    }

    ngOnInit() {
        // tslint:disable-next-line: radix
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'));
        this.cargarVirus();
    }

    cargarVirus() {
        this.sidvi.virus.obtenerVirus(this.idVirus).subscribe(
            virus => {
                this.virus = new Virus(virus);

                if (Defaults.allowBase64Types.includes(this.virus.mimetypeIcono)) {
                    this.virus.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.virus.archivoIcono as string);
                }

                this.virus.localFileName = 'Choose file';
            },
            err => console.error(err)
        );
    }

    handleFileInput(files: FileList) {
        if (files[0] != null) {
            this.virus.localFile = files;
            this.virus.localFileName = files[0].name;
        }
    }

    guardar() {

        delete this.virus.archivoIcono;
        delete this.virus.mimetypeIcono;

        this.sidvi.virus.actualizarVirus(this.idVirus, this.virus).subscribe(
            res => {
                // Checar si se subió un doc
                if (this.virus.localFile != null) {
                    this.actualizarVirusIcono();
                    this.virus.localFile = null;
                    this.virus.localFileName = 'Choose file';
                    return;
                }

                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Virus actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.cargarVirus();
                    }
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    actualizarVirusIcono() {

        this.sidvi.virus.cargarVirusIcono(this.idVirus, this.virus.localFile[0]).subscribe(
            res => {
                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Virus actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.cargarVirus();
                    }
                });
            },
            error => {
                alert('Los archivos no se pudieron actualizar');
            }
        );
    }

    eliminarVirus() {
        // Mostrar mensaje de confirmación
        Swal.fire({
            title: 'Confirmación',
            text: '¿Estás seguro que quieres eliminar este virus?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
            heightAuto: false
        }).then((result) => {
            if (result.value) {
                this.sidvi.virus.eliminarVirus(this.idVirus).subscribe(
                    res => {
                        if (res && res.type === _APIResponse.TypeEnum.SUCCESS) {
                            Swal.fire({
                                title: 'Borrado completo',
                                text: 'El virus ha sido eliminado exitosamente',
                                icon: 'success',
                                heightAuto: false
                            }).then((results) => {
                                this.sidvi.manager.updateMain.next(1);
                            });
                        }
                    },
                    error => {
                        alert('No se pudo eliminar');
                    }
                );
            }
        });
    }
}
