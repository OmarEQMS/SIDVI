import { Component, OnInit, ViewChild } from '@angular/core';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import { ActivatedRoute } from '@angular/router';
import { IUbicacion, Ubicacion, Virus, CategoriaEstadistica, SubcategoriaEstadistica, Estadistica } from 'src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { GraficaEstadistica } from 'src/app/extra/GraficaEdtadistica';
import { faTimesCircle, faPencilAlt, faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
selector: 'app-editar-estadistica',
templateUrl: './editar-estadistica.component.html',
styleUrls: ['./editar-estadistica.component.scss'],
})
export class EditarEstadisticaComponent implements OnInit {
    @ViewChild('modalEstadistica', null) modalEstadistica: MDBModalRef;

    ubicacion: Ubicacion;
    categorias: CategoriaEstadistica[];
    idVirus: number;
    virus: Virus;

    idCategoriaSelected: string;
    idSubcategoriaSelected: string;
    idCategoriaSelectedGrupo: string;
    idSubcategoriaSelectedGrupo: string;
    categoriaSelected: CategoriaEstadistica;
    subcategoriaSelected: SubcategoriaEstadistica;
    categoriaSelectedGrupo: CategoriaEstadistica;
    subcategoriaSelectedGrupo: SubcategoriaEstadistica;
    segundaCategoria: boolean;
    idUbicacion: number;
    idEstadistica: number;

    estadisticas: Estadistica[];

    fecha: string;
    valor: number;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus,
        delete: faTimesCircle,
        editar: faPencilAlt
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute
    ) {
        this.virus = new Virus();
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false } as IUbicacion);
        this.categoriaSelectedGrupo = new CategoriaEstadistica({idCategoriaEstadistica: -1});
        this.categoriaSelected = new CategoriaEstadistica({idCategoriaEstadistica: -1});
        this.subcategoriaSelected = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.subcategoriaSelectedGrupo = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.idCategoriaSelected = '-1';
        this.idCategoriaSelectedGrupo = '-1';
        this.idSubcategoriaSelected = '-1';
        this.idSubcategoriaSelectedGrupo = '-1';
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false } as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        await this.obtenerCategorias();
        this.obtenerVirus();
    }

    obtenerVirus() {
        this.sidvi.virus.obtenerVirus(this.idVirus).subscribe(
            virus => {
                this.virus = new Virus(virus);
        });
    }

    async obtenerCategorias() {
        const categorias = await this.sidvi.categoriaEstadistica.listarCategoriaEstadistica().toPromise();
        this.categorias = categorias.resultados.map((item: any) => new CategoriaEstadistica(item));
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
    ubicacionSelected(ubi: Ubicacion) {
        this.idUbicacion = ubi.idUbicacion;
        this.unselectUbicacion(this.ubicacion, ubi.idUbicacion);
    }
    unselectUbicacion(ubicacion: Ubicacion, idUbicacion: number) {
        ubicacion.localSelected = (ubicacion.idUbicacion !== idUbicacion) ? false : true;
        for (const ubi of ubicacion.ubicaciones) {
            this.unselectUbicacion(ubi, idUbicacion);
        }
    }

    updateCategoria() {
        this.categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.idCategoriaSelected, 10) );
        this.subcategoriaSelected = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.idSubcategoriaSelected = '-1';
    }
    updateSubcategoria() {
        this.subcategoriaSelected = this.categoriaSelected.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.idSubcategoriaSelected, 10) );
    }
    updateCategoriaGrupo() {
        this.categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.idCategoriaSelectedGrupo, 10) );
        this.subcategoriaSelectedGrupo = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.idSubcategoriaSelectedGrupo = '-1';
    }
    updateSubcategoriaGrupo() {
        this.subcategoriaSelectedGrupo = this.categoriaSelectedGrupo.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.idSubcategoriaSelectedGrupo, 10) );
    }

    consultarEstadisticas() {
        const fkSubcategoriaEstadistica1 = this.subcategoriaSelected.idSubcategoriaEstadistica;
        let fkSubcategoriaEstadistica2 = this.subcategoriaSelectedGrupo.idSubcategoriaEstadistica;

        if (this.idUbicacion == null) {
            Swal.fire({title: 'Selecciona una ubicacion invalida', icon: 'error', backdrop: false});
            return;
        }
        if (fkSubcategoriaEstadistica1 === -1) {
            Swal.fire({title: 'Tipo de Subcategoria invalido', icon: 'error', backdrop: false});
            return;
        }
        if (this.segundaCategoria && fkSubcategoriaEstadistica2 === -1) {
            Swal.fire({title: 'Tipo de Subcategoria invalido', icon: 'error', backdrop: false});
            return;
        } else {
            fkSubcategoriaEstadistica2 = null;
        }

        this.sidvi.estadistica.listarEstadisticas(this.idVirus, null, fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2, null, null, null, null, 'fecha', OrderModeEnum.DESC).subscribe(
            estadis => {
                this.estadisticas = estadis.resultados.map((item: any) => new Estadistica(item));
        });
    }

    editarEstadistica(estadistica: Estadistica) {
        this.valor = estadistica.valor;
        this.fecha = estadistica.localFecha;
        this.idEstadistica = estadistica.idEstadistica;
    }

    nuevoEstadistica() {
        this.valor = 0;
        this.fecha = '';
        this.idEstadistica = -1;
    }

    async eliminarEstadistica(idEstadistica: number) {
        const result = await Swal.fire({
            title: 'Se eliminara la estadistica',
            text: 'Esto podria causar incongruencia en los datos',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            backdrop: false
        });

        if (result.value) {
            this.sidvi.estadistica.eliminarEstadistica(idEstadistica).subscribe(
                res => {
                    Swal.fire({title: 'Listo', text: 'Estadistica eliminada', icon: 'success', backdrop: false});
                    this.consultarEstadisticas();
            });
        }
    }

    guardarEstadistica() {
        const fkSubcategoriaEstadistica1 = this.subcategoriaSelected.idSubcategoriaEstadistica;
        let fkSubcategoriaEstadistica2 = this.subcategoriaSelectedGrupo.idSubcategoriaEstadistica;

        if (this.fecha == null && this.fecha === '') {
            Swal.fire({title: 'Fecha invalido', icon: 'error', backdrop: false});
            return;
        }
        if (this.valor == null && this.valor < 0) {
            Swal.fire({title: 'Valor invalido', icon: 'error', backdrop: false});
            return;
        }
        if (this.idUbicacion == null) {
            Swal.fire({title: 'Selecciona una ubicacion invalida', icon: 'error', backdrop: false});
            return;
        }
        if (fkSubcategoriaEstadistica1 === -1) {
            Swal.fire({title: 'Tipo de Subcategoria invalido', icon: 'error', backdrop: false});
            return;
        }
        if (this.segundaCategoria && fkSubcategoriaEstadistica2 === -1) {
            Swal.fire({title: 'Tipo de Subcategoria invalido', icon: 'error', backdrop: false});
            return;
        } else {
            fkSubcategoriaEstadistica2 = null;
        }

        const newEstadis = new Estadistica({idEstadistica: this.idEstadistica,
                                            fkVirus: this.idVirus,
                                            fkUbicacion: this.idUbicacion,
                                            fkSubcategoriaEstadistica1,
                                            fkSubcategoriaEstadistica2,
                                            valor: this.valor,
                                            fecha: this.fecha
                                        });

        if (this.idEstadistica === -1) {
            this.sidvi.estadistica.crearEstadistica(newEstadis).subscribe(
                res => {
                    Swal.fire({title: 'Listo', text: 'Estadistica creada', icon: 'success', backdrop: false});
                    this.consultarEstadisticas();
                    this.modalEstadistica.hide();
            });
        } else {
            this.sidvi.estadistica.actualizarEstadistica(this.idEstadistica, newEstadis).subscribe(
                res => {
                    Swal.fire({title: 'Listo', text: 'Estadistica actualizada', icon: 'success', backdrop: false});
                    this.consultarEstadisticas();
                    this.modalEstadistica.hide();
            });
        }

    }

}
