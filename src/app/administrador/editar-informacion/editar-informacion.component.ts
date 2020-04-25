import { Component, OnInit, ViewChild } from '@angular/core';
import { Virus, Informacion, CategoriaInformacion } from 'src/models';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { VgAPI } from 'videogular2/compiled/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { _APIResponse } from 'src/api/APIResponse';
import { ModalContainerComponent } from 'angular-bootstrap-md';


@Component({
    selector: 'app-editar-informacion',
    templateUrl: './editar-informacion.component.html',
    styleUrls: ['./editar-informacion.component.scss'],
})
export class EditarInformacionComponent implements OnInit {

    @ViewChild('basicModal', { static: true }) basicModal: ModalContainerComponent;
    virus: Virus;
    categorias: CategoriaInformacion[];
    addFileName: string;
    addInfoForm: FormGroup;
    addFile: FileList;
    addInformacion: Informacion;

    icons: { [id: string]: IconDefinition } = {
        zoomIn: faSearchPlus,
        zoomOut: faSearchMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {
        this.virus = new Virus();
        this.addFileName = 'Choose file';
        this.addInfoForm = new FormGroup({
            texto: new FormControl('', Validators.required),
            categoria: new FormControl('', Validators.required),
            descripcion: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.listarVirus();
        this.listCategoriasInfo();
    }

    listarVirus() {
        this.virus.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.sidvi.virus.obtenerVirus(this.virus.idVirus).subscribe(
            virus => {
                this.virus = virus;

                if (Defaults.allowBase64Types.includes(this.virus.mimetypeIcono)) {
                    this.virus.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.virus.archivoIcono as string);
                }

                this.sidvi.informacion.listarInformaciones(this.virus.idVirus).subscribe(
                    informaciones => {
                        this.virus.informaciones = informaciones.resultados.map((item: any) => new Informacion(item));

                        for (const informacion of this.virus.informaciones) {
                            if (Defaults.allowBase64Types.includes(informacion.mimetype)) {
                                informacion.archivoImg = this.sanitizer.bypassSecurityTrustResourceUrl(informacion.archivo as string);
                            }
                            if (informacion.mimetype === ContentTypeEnum.MP4) {
                                informacion.archivoVideo = this.sidvi.informacion.urlInformacionArchivo(informacion.idInformacion);
                            }
                            if (informacion.mimetype === ContentTypeEnum.PDF) {
                                informacion.archivoPdf = this.sidvi.informacion.urlInformacionArchivo(informacion.idInformacion);
                                informacion.archivoPdfZoom = 1;
                            }
                        }
                    });
            });
    }

    listCategoriasInfo() {
        this.sidvi.categoriaInformacion.listarCategoriasInformacion().subscribe(
            categoriasInfo => {
                this.categorias = categoriasInfo.resultados;
            }
        );
    }

    onPlayerReady(informacion: Informacion, api: VgAPI) {
        informacion.archivoVideoAPI = api;
        informacion.archivoVideoAPI.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                informacion.archivoVideoAPI.getDefaultMedia().currentTime = 0;
            }
        );
    }
    pdfZoomIn(informacion: Informacion) {
        informacion.archivoPdfZoom += 0.1;
    }
    pdfZoomOut(informacion: Informacion) {
        informacion.archivoPdfZoom -= 0.1;
    }

    guardar(informacion: Informacion) {

        delete informacion.archivo;
        delete informacion.mimetype;

        console.log(informacion);

        this.sidvi.informacion.actualizarInformacion(informacion.idInformacion, informacion).subscribe(
            res => {
                if (res) {

                    // Checar si se subio un doc
                    if (informacion.localFile != null) {
                        this.actualizarInformacionArchivo(informacion);
                        informacion.localFile = null;
                        informacion.localFileName = 'Choose file';
                        return;
                    }

                    // tslint:disable-next-line: max-line-length
                    Swal.fire({ title: '¡Listo!', text: 'Bloque actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                        if (result.value) {
                            this.listarVirus();
                        }
                    });
                }
            },
            error => {
                alert('No se pudo loguear');
            }
        );
    }

    actualizarInformacionArchivo(informacion: Informacion) {
        this.sidvi.informacion.cargarInformacionArchivo(informacion.idInformacion, informacion.localFile[0]).subscribe(
            res => {
                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Bloque actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.listarVirus();
                    }
                });
            },
            error => {
                alert('Los archivos no se pudieron actualizar');
            }
        );
    }

    eliminar(informacion: Informacion) {
        // Mostrar mensaje de confirmación
        Swal.fire({
            title: 'Confirmación',
            text: '¿Estás seguro que quieres eliminar esta información?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar',
            heightAuto: false
        }).then((result) => {
            if (result.value) {
                this.sidvi.informacion.eliminarInformacion(informacion.idInformacion).subscribe(
                    res => {
                        if (res && res.type === _APIResponse.TypeEnum.SUCCESS) {
                            Swal.fire({
                                title: 'Borrado completo',
                                text: 'El bloque de información ha sido eliminado exitosamente',
                                icon: 'success',
                                heightAuto: false
                            }).then((results) => {
                                this.listarVirus();
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

    handleFileInput(informacion: Informacion, files: FileList) {
        if (files[0] != null) {
            informacion.localFile = files;
            informacion.localFileName = files[0].name;
        }
    }

    handleAddFileInput(files: FileList) {
        if (files[0] != null) {
            this.addFile = files;
            this.addFileName = files[0].name;
        }
    }

    agregar() {

        const formVals = this.addInfoForm.value;

        this.addInformacion = new Informacion();
        this.addInformacion.texto = formVals.texto;
        this.addInformacion.descripcion = formVals.descripcion;
        this.addInformacion.fkVirus = this.virus.idVirus;
        this.addInformacion.fkCategoriaInformacion = parseInt(formVals.categoria, 10);

        this.sidvi.informacion.crearInformacion(this.addInformacion).subscribe(
            results => {

                // Checar si se subio un doc
                if (this.addFile != null) {
                    this.agregarInformacionArchivo(results.extra.insertedId);
                    return;
                }

                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Bloque agregado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.listarVirus();
                        this.resetModal();
                    }
                });
            },
            error => {
                alert('No se pudo loguear');
            }
        );
    }

    resetModal() {
        this.basicModal.hide();
        this.addInfoForm.reset();
        this.addFile = null;
        this.addFileName = 'Choose file';
    }

    agregarInformacionArchivo(idInformacion: number) {
        this.sidvi.informacion.cargarInformacionArchivo(idInformacion, this.addFile[0]).subscribe(
            res => {
                // tslint:disable-next-line: max-line-length
                Swal.fire({ title: '¡Listo!', text: 'Bloque agregado correctamente', icon: 'success', heightAuto: false }).then((result) => {
                    if (result.value) {
                        this.listarVirus();
                        this.resetModal();
                    }
                });
            },
            error => {
                alert('Los archivos no se pudieron actualizar');
            }
        );
    }

}
