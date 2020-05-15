import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Ubicacion, IUbicacion, Informacion, CategoriaInformacion, CategoriaEstadistica, Estadistica, SubcategoriaEstadistica } from 'src/models';
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
  @ViewChild('modalAgregarSubestadistica', null) modalAgregarSubestadistica: MDBModalRef;
  @ViewChild('modalEditarUbicacion', null) modalEditarUbicacion: MDBModalRef;
  @ViewChild('modalEditarInformacion', null) modalEditarInformacion: MDBModalRef;
  @ViewChild('modalEditarEstadistica', null) modalEditarEstadistica: MDBModalRef;
  @ViewChild('modalEditarSubestadistica', null) modalEditarSubestadistica: MDBModalRef;
  @ViewChild('modalEliminarInformacion', null) modalEliminarInformacion: MDBModalRef;
  @ViewChild('modalEliminarEstadistica', null) modalEliminarEstadistica: MDBModalRef;
  @ViewChild('modalEliminarSubestadistica', null) modalEliminarSubestadistica: MDBModalRef;
  @ViewChild('modalEliminarUbicacion', null) modalEliminarUbicacion: MDBModalRef;
  @ViewChild('modalAgregarHijo', null) modalAgregarHijo: MDBModalRef;



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
  hijoUbicacion: Ubicacion;
  area: string;
  localSubcategoriaEstadistica: SubcategoriaEstadistica;
  newSubcategoriaEstadistica: SubcategoriaEstadistica;
  validacionUbicacion: boolean;
  validacionEstadistica: boolean;
  validacionSubcategoria: boolean;
  validacionInformacion: boolean;
  validacionUbicacionEditar: boolean;
  validacionEstadisticaEditar: boolean;
  validacionSubcategoriaEditar: boolean;
  validacionInformacionEditar: boolean;
  validacionUbicacionHijo: boolean;

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
    this.hijoUbicacion = new Ubicacion();
    this.localSubcategoriaEstadistica = new SubcategoriaEstadistica();
    this.newSubcategoriaEstadistica = new SubcategoriaEstadistica();
    this.validacionUbicacion = false;
    this.validacionEstadistica = false;
    this.validacionSubcategoria = false;
    this.validacionInformacion = false;
    this.validacionUbicacionEditar = false;
    this.validacionEstadisticaEditar = false;
    this.validacionSubcategoriaEditar = false;
    this.validacionInformacionEditar = false;
    this.validacionUbicacionHijo = false;

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
    if (this.nuevoNombre === '' || this.nuevoNombre == null) {
      this.validacionUbicacionEditar = true;
    } else {
      this.sidvi.ubicacion.actualizarUbicacion(this.localUbicacion.idUbicacion, this.localUbicacion).subscribe(
        res => {
          console.log(res);
          this.modalEditarUbicacion.hide();
          Swal.fire({ title: 'La Ubicación se renombró con éxito', icon: 'success', backdrop: false });
          this.nuevoNombre = '';
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Ubicación no se pudo renombrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
  }

  agregarUbicacion() {

    if (this.nuevaUbicacion.nombre === '' || this.nuevaUbicacion.nombre == null || this.nuevaUbicacion.clave === '' || this.nuevaUbicacion.clave == null) {
      this.validacionUbicacion = true;
    } else {
      this.validacionUbicacion = false;
      this.sidvi.ubicacion.crearUbicacion(this.nuevaUbicacion).subscribe(
        res => {
          console.log(res);
          this.modalAgregarUbicacion.hide();
          Swal.fire({ title: 'La Ubicación se creó con éxito', icon: 'success', backdrop: false });
          this.nuevaUbicacion.nombre = '';
          this.nuevaUbicacion.clave = '';
          this.getUbicacionesHijo(this.ubicacion);
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Ubicación no se pudo registrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
  }

  agregarUbicacionHijo() {
    if (this.hijoUbicacion.nombre === '' || this.hijoUbicacion.nombre == null || this.hijoUbicacion.clave === '' || this.hijoUbicacion.clave == null) {
      this.validacionUbicacionHijo = true;
    } else {
      this.sidvi.ubicacion.crearUbicacion(this.hijoUbicacion).subscribe(
        res => {
          console.log(res);
          this.modalAgregarHijo.hide();
          Swal.fire({ title: 'La Ubicación Hijo se creó con éxito', icon: 'success', backdrop: false });
          this.getUbicacionesHijo(this.ubicacion);
          this.hijoUbicacion.nombre = '';
          this.hijoUbicacion.clave = '';
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Ubicación Hijo no se pudo registrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
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
    if (this.nuevoNombreInformacion === '' || this.nuevoNombreInformacion == null) {
      this.validacionInformacionEditar = true;
    } else {
      this.sidvi.categoriaInformacion.actualizarCategoriaInformacion(this.localInformacion.idCategoriaInformacion,
        this.localInformacion).subscribe(
          res => {
            console.log(res);
            this.modalEditarInformacion.hide();
            Swal.fire({ title: 'La Información se renombró con éxito', icon: 'success', backdrop: false });
            this.nuevoNombreInformacion = '';
          },
          err => {
            console.log(err);
            Swal.fire({ title: 'La Información no se pudo renombrar con éxito', icon: 'error', backdrop: false });

          }
        );
    }
  }

  agregarInformacion() {
    if (this.nuevaInformacion.nombre === '' || this.nuevaInformacion.nombre == null || this.nuevaInformacion.clave === '' || this.nuevaInformacion.clave == null) {
      this.validacionInformacion = true;
    } else {
      this.validacionInformacion = false;
      this.sidvi.categoriaInformacion.crearCategoriaInformacion(this.nuevaInformacion).subscribe(
        res => {
          console.log(res);
          this.modalAgregarInformacion.hide();
          Swal.fire({ title: 'La Información se creó con éxito', icon: 'success', backdrop: false });
          this.getInformacion();
          this.nuevaInformacion.nombre = '';
          this.nuevaInformacion.clave = '';
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Información no se pudo registrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
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
    if (this.nuevoNombreEstadistica === '' || this.nuevoNombreEstadistica == null) {
      this.validacionEstadisticaEditar = true;
    } else {
      this.sidvi.categoriaEstadistica.actualizarCategoriaEstadistica(this.localEstadistica.idCategoriaEstadistica,
        this.localEstadistica).subscribe(
          res => {
            console.log(res);
            this.modalEditarEstadistica.hide();
            Swal.fire({ title: 'La Estadística se renombró con éxito', icon: 'success', backdrop: false });
            this.nuevoNombreEstadistica = '';
          },
          err => {
            console.log(err);
            Swal.fire({ title: 'La Estadística no se pudo renombrar con éxito', icon: 'error', backdrop: false });
          }
        );
    }
  }

  agregarEstadistica() {
    if (this.nuevaEstadistica.nombre === '' || this.nuevaEstadistica.nombre == null) {
      this.validacionEstadistica = true;
    } else {
      this.sidvi.categoriaEstadistica.crearCategoriaEstadistica(this.nuevaEstadistica).subscribe(
        res => {
          console.log(res);
          this.modalAgregarEstadistica.hide();
          Swal.fire({ title: 'La Estadística se creó con éxito', icon: 'success', backdrop: false });
          this.getEstadistica();
          this.nuevaEstadistica.nombre = '';
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La Estadística no se pudo registrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
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

  renombrarSubcategoriaEstadistica() {
    if (this.newSubcategoriaEstadistica.nombre === '' || this.newSubcategoriaEstadistica.nombre == null) {
      this.validacionSubcategoriaEditar = true;
    } else {
      this.sidvi.subcategoriaEstadisticaService.actualizarSubcategoriaEstadistica(this.localSubcategoriaEstadistica.idSubcategoriaEstadistica,
        this.localSubcategoriaEstadistica).subscribe(
          res => {
            console.log(res);
            this.modalEditarSubestadistica.hide();
            Swal.fire({ title: 'La Subcategoría Estadística se renombró con éxito', icon: 'success', backdrop: false });
          },
          err => {
            console.log(err);
            Swal.fire({ title: 'La Subcategoría Estadística no se pudo renombrar con éxito', icon: 'error', backdrop: false });
          }
        );
    }
  }

  agregarSubcategoriaEstadistica() {
    if (this.newSubcategoriaEstadistica.nombre === '' || this.newSubcategoriaEstadistica.nombre == null) {
      this.validacionSubcategoria = true;
    } else {
      this.newSubcategoriaEstadistica.fkCategoriaEstadistica = this.localEstadistica.idCategoriaEstadistica;
      this.sidvi.subcategoriaEstadisticaService.crearSubcategoriaEstadistica(this.newSubcategoriaEstadistica).subscribe(
        res => {
          console.log(res);
          this.modalAgregarSubestadistica.hide();
          Swal.fire({ title: 'La Subcategoría Estadística se creó con éxito', icon: 'success', backdrop: false });
          this.getEstadistica();
        },
        err => {
          console.log(err);
          Swal.fire({ title: 'La SubcategoríaEstadística no se pudo registrar con éxito', icon: 'error', backdrop: false });
        }
      );
    }
  }

  eliminarSubcategoriaEstadistica() {
    this.sidvi.subcategoriaEstadisticaService.eliminarSubcategoriaEstadistica(this.localSubcategoriaEstadistica.idSubcategoriaEstadistica).subscribe(
      res => {
        console.log(res);
        this.getEstadistica();
        this.modalEliminarSubestadistica.hide();
        Swal.fire({ title: 'La Subcategoría Estadística se eliminó con éxito', icon: 'success', backdrop: false });
      },
      err => {
        console.log(err);
        Swal.fire({ title: 'La Subcategoría Estadística no se pudo eliminar con éxito', icon: 'error', backdrop: false });
      }
    );
  }


}
