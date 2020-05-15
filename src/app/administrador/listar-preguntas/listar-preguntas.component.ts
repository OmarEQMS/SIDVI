import { Component, OnInit, ViewChild } from '@angular/core';
import { SIDVIServices } from '../../../api';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TestNodo, Virus } from 'src/models';
import { MDBModalRef } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-preguntas',
  templateUrl: './listar-preguntas.component.html',
  styleUrls: ['./listar-preguntas.component.scss'],
})
export class ListarPreguntasComponent implements OnInit {

  @ViewChild('modalEliminarTestNodo', null) modalEliminarTestNodo: MDBModalRef;
  @ViewChild('modalAgregarPregunta', null) modalAgregarPregunta: MDBModalRef;


  testNodos: TestNodo[];
  localTestNodo: TestNodo;
  nuevoTestNodo: TestNodo;
  virus: Virus;

  constructor(private SIDVI: SIDVIServices, private router: Router, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute,
    ) {
    this.localTestNodo = new TestNodo();
    this.nuevoTestNodo = new TestNodo();
    this.virus = new Virus();
    this.virus.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listarTestNodos();
  }

  listarTestNodos() {
    this.SIDVI.testNodo.listarTestNodos(this.virus.idVirus , null).subscribe(
      res => {
        this.testNodos = res.resultados.map((item: any) => new TestNodo(item));
      },
      err => {
        console.log(err);

      }
    );
  }

  eliminarTestNodo() {
    this.SIDVI.testNodo.eliminarTestNodo(this.localTestNodo.idTestNodo).subscribe(
      res => {
        console.log(res);
        this.modalEliminarTestNodo.hide();
        Swal.fire({ title: 'La Pregunta se eliminó con éxito', icon: 'success', backdrop: false });
        this.listarTestNodos();
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Pregunta no se pudo eliminar con éxito', icon: 'error', backdrop: false });

      }
    );
  }

  agregarTestNodo() {
    this.nuevoTestNodo.fkVirus = this.virus.idVirus;
    this.SIDVI.testNodo.crearTestNodo(this.nuevoTestNodo).subscribe(
      res => {
        console.log(res);
        this.modalAgregarPregunta.hide();
        Swal.fire({ title: 'La Pregunta se creó con éxito', icon: 'success', backdrop: false });
        this.listarTestNodos();
        this.nuevoTestNodo.texto = '';
        this.nuevoTestNodo.descripcion = '';
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Pregunta no se pudo registrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }

  async crearNodoRaiz() {
    const res = await this.SIDVI.virus.obtenerVirus(this.virus.idVirus).toPromise();
    this.virus = new Virus(res);
    this.virus.fkTestNodo = this.localTestNodo.idTestNodo;

    this.SIDVI.virus.actualizarVirus(this.virus.idVirus, this.virus).subscribe(
      res => {
        Swal.fire({ title: 'La Pregunta raíz se actualizó con éxito', icon: 'success', backdrop: false });
        this.listarTestNodos();
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Pregunta raíz no se actualizó con éxito', icon: 'error', backdrop: false });

      }
    );
  }



}
