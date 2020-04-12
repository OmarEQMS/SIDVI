import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Virus, Informacion } from 'src/models';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { VgAPI } from 'videogular2/compiled/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit {
    virus: Virus;

    icons: { [id: string]: IconDefinition } = {
        zoomIn: faSearchPlus,
        zoomOut: faSearchMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        this.virus = new Virus();
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.virus = new Virus();
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
}
