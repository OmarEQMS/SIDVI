import { Component, OnInit } from '@angular/core';
import { TestNodo, TestOpcion } from 'src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
    testNodo: TestNodo;

    icons: { [id: string]: IconDefinition } = {
        zoomIn: faSearchPlus,
        zoomOut: faSearchMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private router: Router
    ) {
        this.testNodo = new TestNodo();
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.testNodo = new TestNodo();
        this.testNodo.idTestNodo = parseInt(this.activatedRoute.snapshot.paramMap.get('idTestNodo'), 10);
        this.sidvi.testNodo.obtenerTestNodo(this.testNodo.idTestNodo).subscribe(
            nodo => {
                this.testNodo = new TestNodo(nodo);

                if (Defaults.allowBase64Types.includes(this.testNodo.mimetype)) {
                    this.testNodo.archivoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.testNodo.archivo as string);
                }
                if (this.testNodo.mimetype === ContentTypeEnum.MP4) {
                    this.testNodo.archivoVideo = this.sidvi.testNodo.urlTestNodoArchivo(this.testNodo.idTestNodo);
                }
                if (this.testNodo.mimetype === ContentTypeEnum.PDF) {
                    this.testNodo.archivoPdf = this.sidvi.testNodo.urlTestNodoArchivo(this.testNodo.idTestNodo);
                    this.testNodo.archivoPdfZoom = 1;
                }

                this.sidvi.testOpcion.listarTestOpciones(this.testNodo.idTestNodo).subscribe(
                    opciones => {
                        this.testNodo.testOpciones = opciones.resultados.map((item: any) => new TestOpcion(item));

                        for (const opcion of this.testNodo.testOpciones) {
                            if (Defaults.allowBase64Types.includes(opcion.mimetype)) {
                                opcion.archivoImg = this.sanitizer.bypassSecurityTrustResourceUrl(opcion.archivo as string);
                            }
                        }
                });
        });
    }

    openNodo(opcion: TestOpcion) {
        this.router.navigate(['/test', opcion.fkTestNodoSig]);
    }

    onPlayerReady(api: VgAPI) {
        this.testNodo.archivoVideoAPI = api;
        this.testNodo.archivoVideoAPI.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                this.testNodo.archivoVideoAPI.getDefaultMedia().currentTime = 0;
            }
        );
    }
    pdfZoomIn() {
        this.testNodo.archivoPdfZoom += 0.1;
    }
    pdfZoomOut() {
        this.testNodo.archivoPdfZoom -= 0.1;
    }
}
