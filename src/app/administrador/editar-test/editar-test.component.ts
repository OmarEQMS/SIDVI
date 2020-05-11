import { Component, OnInit, ViewChild } from '@angular/core';
import { TestNodo, TestOpcion } from 'src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus, faSearchMinus, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/compiled/core';
import Swal from 'sweetalert2';
import { MDBModalRef } from 'angular-bootstrap-md';


@Component({
  selector: 'app-editar-test',
  templateUrl: './editar-test.component.html',
  styleUrls: ['./editar-test.component.scss'],
})
export class EditarTestComponent implements OnInit {
  @ViewChild('modalEditarOpcion', null) modalEditarOpcion: MDBModalRef;

  testNodo: TestNodo;
  localOpcion: TestOpcion;
  testNodos: TestNodo[];
  nuevaOpcionTexto: string;


  icons: { [id: string]: IconDefinition } = {
    zoomIn: faSearchPlus,
    zoomOut: faSearchMinus,
    regresar: faArrowAltCircleLeft
  };

  constructor(
    public sidvi: SIDVIServices,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.testNodo = new TestNodo();
    this.localOpcion = new TestOpcion();
  }

  ngOnInit() { }
  ionViewWillEnter() {
    this.listarTestNodos();
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

  listarTestNodos() {
    this.sidvi.testNodo.listarTestNodos().subscribe(
      res => {
        this.testNodos = res.resultados.map((item: any) => new TestNodo(item));
      },
      err => {
        console.log(err);

      }
    );
  }

  actualizarTestOpcion() {
    this.localOpcion.fkTestNodoSig = parseInt(this.localOpcion.fkTestNodoSig as any, 10);
    console.log(this.localOpcion);

    this.sidvi.testOpcion.actualizarTestOpcion(this.localOpcion.idTestOpcion,
      this.localOpcion).subscribe(
        res => {
          console.log(res);
          this.modalEditarOpcion.hide();
          Swal.fire({ title: 'La Opción se actualizó con éxito', icon: 'success', backdrop: false });
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Opción no se pudo actualizar con éxito', icon: 'error', backdrop: false });
        }
      );
  }

}
