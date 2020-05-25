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
  @ViewChild('modalEliminarTestOpcion', null) modalEliminarTestOpcion: MDBModalRef;
  @ViewChild('modalAgregarOpcion', null) modalAgregarOpcion: MDBModalRef;

  testNodo: TestNodo;
  newTestNodo: TestNodo;
  localOpcion: TestOpcion;
  testNodos: TestNodo[];
  newLocalOpcion: TestOpcion;
  nuevaOpcion: TestOpcion;
  idVirus: number;

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
    this.newTestNodo = new TestNodo();
    this.localOpcion = new TestOpcion();
    this.newLocalOpcion = new TestOpcion();
    this.nuevaOpcion = new TestOpcion();
    this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);

  }

  ngOnInit() { }
  ionViewWillEnter() {
    this.listarTestNodos();
    this.listarTestOpciones();
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

  listarTestOpciones() {
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

    this.sidvi.testOpcion.actualizarTestOpcion(this.localOpcion.idTestOpcion,
      this.localOpcion).subscribe(
        async res => {
          // Checar si se subio un doc
          if (this.localOpcion.localFile != null) {
            await this.actualizarTestOpcionArchivo(this.localOpcion);
            this.localOpcion.localFile = null;
            this.localOpcion.localFileName = 'Choose file';
          }
          this.modalEditarOpcion.hide();
          this.listarTestOpciones();
          Swal.fire({ title: 'La Opción se actualizó con éxito', icon: 'success', backdrop: false });
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Opción no se pudo actualizar con éxito', icon: 'error', backdrop: false });
        }
      );

  }

  handleFileInput(testOpcion: TestOpcion, files: FileList) {
    if (files[0] != null) {
      testOpcion.localFile = files;
      testOpcion.localFileName = files[0].name;
    }
  }

  async actualizarTestOpcionArchivo(testOpcion: TestOpcion) {
    await this.sidvi.testOpcion.cargarTestOpcionArchivo(testOpcion.idTestOpcion, testOpcion.localFile[0]).toPromise();
    Swal.fire({ title: '¡Listo!', text: 'Bloque actualizado correctamente', icon: 'success', heightAuto: false });

  }

  eliminarTestOpcion() {
    this.sidvi.testOpcion.eliminarTestOpcion(this.localOpcion.idTestOpcion).subscribe(
      res => {
        console.log(res);
        this.modalEliminarTestOpcion.hide();
        Swal.fire({ title: 'La Opción se eliminó con éxito', icon: 'success', backdrop: false });
        this.listarTestOpciones();
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Opción no se pudo eliminar con éxito', icon: 'error', backdrop: false });

      }
    );
  }

  // TestNodo edicion


  async actualizarTestNodoArchivo(testNodo: TestNodo) {
    await this.sidvi.testNodo.cargarTestNodoArchivo(testNodo.idTestNodo, testNodo.localFile[0]).toPromise();
    Swal.fire({ title: '¡Listo!', text: 'Bloque actualizado correctamente', icon: 'success', heightAuto: false });

  }

  handleFileInputNodo(testNodo: TestNodo, files: FileList) {
    if (files[0] != null) {
      testNodo.localFile = files;
      testNodo.localFileName = files[0].name;
    }
  }

  actualizarTestNodo() {
    this.sidvi.testNodo.actualizarTestNodo(this.testNodo.idTestNodo,
      this.testNodo).subscribe(
        async res => {
          // Checar si se subio un doc
          if (this.testNodo.localFile != null) {
            await this.actualizarTestNodoArchivo(this.testNodo);
            this.testNodo.localFile = null;
            this.testNodo.localFileName = 'Choose file';
            this.listarTestOpciones();
            this.listarTestNodos();
          }
          Swal.fire({ title: 'La Pregunta se actualizó con éxito', icon: 'success', backdrop: false });
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Pregunta no se pudo actualizar con éxito', icon: 'error', backdrop: false });
        }
      );

  }

  agregarOpcion() {
    this.nuevaOpcion.fkTestNodo = this.testNodo.idTestNodo;
    this.sidvi.testOpcion.crearTestOpcion(this.nuevaOpcion).subscribe(
      res => {
        console.log(res);
        this.modalAgregarOpcion.hide();
        Swal.fire({ title: 'La Opción se creó con éxito', icon: 'success', backdrop: false });
        this.listarTestOpciones();
        this.nuevaOpcion.texto = '';
        this.nuevaOpcion.descripcion = '';
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Opción no se pudo registrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }


}
