import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Ubicacion, IUbicacion, Informacion, CategoriaInformacion, CategoriaEstadistica, Estadistica } from 'src/models';
import { SIDVIServices } from 'src/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { EventEmitter } from 'protractor';
import Swal from 'sweetalert2';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-editar-catalogos',
  templateUrl: './editar-catalogos.component.html',
  styleUrls: ['./editar-catalogos.component.scss'],
})
export class EditarCatalogosComponent implements OnInit {
  @ViewChild('modalAgregarUbicacion', null) modalAgregarUbicacion: MDBModalRef;
  @ViewChild('modalAgregarInformacion', null) modalAgregarInformacion: MDBModalRef;
  @ViewChild('modalAgregarEstadistica', null) modalAgregarEstadistica: MDBModalRef;
  @ViewChild('modalEditarUbicacion', null) modalEditarUbicacion: MDBModalRef;
  @ViewChild('modalEditarInformacion', null) modalEditarInformacion: MDBModalRef;
  @ViewChild('modalEditarEstadistica', null) modalEditarEstadistica: MDBModalRef;
  @ViewChild('modalEliminarInformacion', null) modalEliminarInformacion: MDBModalRef;
  @ViewChild('modalEliminarEstadistica', null) modalEliminarEstadistica: MDBModalRef;
  @ViewChild('modalEliminarUbicacion', null) modalEliminarUbicacion: MDBModalRef;



  ubicacion: Ubicacion;
  ubicacionesIds: number[];
  informaciones: CategoriaInformacion[];
  estadisticas: CategoriaEstadistica[];
  localUbicacion: Ubicacion;
  localInformacion: CategoriaInformacion;
  localEstadistica: CategoriaEstadistica;
  nuevoNombre: string;
  nuevaUbicacion: Ubicacion;
  nuevoNombreInformacion: string;
  nuevaInformacion: CategoriaInformacion;
  nuevoNombreEstadistica: string;
  nuevaEstadistica: CategoriaEstadistica;
  area: string;

  icons: { [id: string]: IconDefinition } = {
    plus: faChevronRight,
    minus: faChevronDown,
    guion: faMinus
  };

  constructor(
    private sidvi: SIDVIServices,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.ubicacion = new Ubicacion({ idUbicacion: -1, localSelected: false });
    this.localUbicacion = new Ubicacion();
    this.nuevaUbicacion = new Ubicacion();
    this.localEstadistica = new CategoriaEstadistica();
    this.nuevaEstadistica = new CategoriaEstadistica();
    this.localInformacion = new CategoriaInformacion();
    this.nuevaInformacion = new CategoriaInformacion();
  }

  ngOnInit() {
    this.area = this.activatedRoute.snapshot.paramMap.get('area');
    console.log(this.area);
  }

  async ionViewWillEnter() {
    await this.getUbicacionesHijo(this.ubicacion);
    this.getInformacion();
    this.getEstadistica();
  }

  async getUbicacionesHijo(ubicacion: Ubicacion) {
    const result = await this.sidvi.ubicacion.listarUbicaciones(ubicacion.idUbicacion).toPromise();
    ubicacion.ubicaciones = result.resultados.map((item: any) => new Ubicacion(item));
    if (result.total > 0) { ubicacion.localPadre = true; ubicacion.localIcono = this.icons.plus; }

    for (const ubi of ubicacion.ubicaciones) {
      ubi.localSelected = ubicacion.localSelected;
      await this.getUbicacionesHijo(ubi);
    }
  }

  ubicacionSelected(ubicacion: Ubicacion) {
    this.localUbicacion = ubicacion;
  }

  getInformacion() {
    this.sidvi.categoriaInformacion.listarCategoriasInformacion().subscribe(
      res => {
        this.informaciones = res.resultados.map((item: any) => new CategoriaInformacion(item));
      },
      err => {
        console.log(err);

      }
    );
  }

  getEstadistica() {
    this.sidvi.categoriaEstadistica.listarCategoriaEstadistica().subscribe(
      res => {
        this.estadisticas = res.resultados.map((item: any) => new CategoriaEstadistica(item));
      },
      err => {
        console.log(err);

      }
    );
  }

  collectIds(ubicacion: Ubicacion) {
    this.ubicacionesIds.push(ubicacion.idUbicacion);
    if (ubicacion.ubicaciones == null) { return; }
    for (const ubi of ubicacion.ubicaciones) {
      this.collectIds(ubi);
    }
  }
  renombrar() {
    this.sidvi.ubicacion.actualizarUbicacion(this.localUbicacion.idUbicacion, this.localUbicacion).subscribe(
      res => {
        console.log(res);
        this.modalEditarUbicacion.hide();
        Swal.fire({ title: 'La Ubicación se renombró con éxito', icon: 'success', backdrop: false });
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Ubicación no se pudo renombrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }

  agregarUbicacion() {
    console.log(this.nuevaUbicacion.nombre);
    this.sidvi.ubicacion.crearUbicacion(this.nuevaUbicacion).subscribe(
      res => {
        console.log(res);
        this.modalAgregarUbicacion.hide();
        Swal.fire({ title: 'La Ubicación se creó con éxito', icon: 'success', backdrop: false });
        this.getUbicacionesHijo(this.ubicacion);
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Ubicación no se pudo registrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }

  async eliminarUbicacion() {
    this.ubicacionesIds = new Array(0);
    this.collectIds(this.localUbicacion);
    console.log('LOS ID HIJOS SON ');
    console.log(this.ubicacionesIds);

    for (const ubicacionId of this.ubicacionesIds) {
      this.sidvi.ubicacion.eliminarUbicacion(ubicacionId).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Ubicación no se pudo eliminar con éxito', icon: 'error', backdrop: false });
        }
      );
    }

    await this.getUbicacionesHijo(this.ubicacion);
    this.modalEliminarUbicacion.hide();
    Swal.fire({ title: 'Las Ubicaciones se eliminaron con éxito', icon: 'success', backdrop: false });
  }

  renombrarInformacion() {
    this.sidvi.categoriaInformacion.actualizarCategoriaInformacion(this.localInformacion.idCategoriaInformacion,
      this.localInformacion).subscribe(
        res => {
          console.log(res);
          this.modalEditarInformacion.hide();
          Swal.fire({ title: 'La Información se renombró con éxito', icon: 'success', backdrop: false });
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Información no se pudo renombrar con éxito', icon: 'error', backdrop: false });

        }
      );
  }

  agregarInformacion() {
    this.sidvi.categoriaInformacion.crearCategoriaInformacion(this.nuevaInformacion).subscribe(
      res => {
        console.log(res);
        this.modalAgregarInformacion.hide();
        Swal.fire({ title: 'La Información se creó con éxito', icon: 'success', backdrop: false });
        this.getInformacion();
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Información no se pudo registrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }

  eliminarInformacion() {
    this.sidvi.categoriaInformacion.eliminarCategoriaInformacion(this.localInformacion.idCategoriaInformacion).subscribe(
      res => {
        console.log(res);
        this.getInformacion();
        this.modalEliminarInformacion.hide();
        Swal.fire({ title: 'La Información se eliminó con éxito', icon: 'success', backdrop: false });
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Información no se pudo eliminar con éxito', icon: 'error', backdrop: false });

      }
    );
  }

  renombrarEstadistica() {
    this.sidvi.categoriaEstadistica.actualizarCategoriaEstadistica(this.localEstadistica.idCategoriaEstadistica,
      this.localEstadistica).subscribe(
        res => {
          console.log(res);
          this.modalEditarEstadistica.hide();
          Swal.fire({ title: 'La Estadística se renombró con éxito', icon: 'success', backdrop: false });
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Estadística no se pudo renombrar con éxito', icon: 'error', backdrop: false });
        }
      );
  }

  agregarEstadistica() {
    this.sidvi.categoriaEstadistica.crearCategoriaEstadistica(this.nuevaEstadistica).subscribe(
      res => {
        console.log(res);
        this.modalAgregarEstadistica.hide();
        Swal.fire({ title: 'La Estadística se creó con éxito', icon: 'success', backdrop: false });
        this.getEstadistica();
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Estadística no se pudo registrar con éxito', icon: 'error', backdrop: false });
      }
    );
  }

  eliminarEstadistica() {
    this.sidvi.categoriaEstadistica.eliminarCategoriaEstadistica(this.localEstadistica.idCategoriaEstadistica).subscribe(
      res => {
        console.log(res);
        this.getEstadistica();
        this.modalEliminarEstadistica.hide();
        Swal.fire({ title: 'La Estadística se eliminó con éxito', icon: 'success', backdrop: false });
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Estadística no se pudo eliminar con éxito', icon: 'error', backdrop: false });
      }
    );
  }


}
