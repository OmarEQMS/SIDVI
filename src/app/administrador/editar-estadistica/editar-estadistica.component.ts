import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { ActivatedRoute } from '@angular/router';
import { IUbicacion, Ubicacion, Virus, CategoriaEstadistica, SubcategoriaEstadistica } from 'src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { GraficaEdtadistica } from 'src/app/extra/GraficaEdtadistica';
import { faTimesCircle, faPencilAlt, faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
selector: 'app-editar-estadistica',
templateUrl: './editar-estadistica.component.html',
styleUrls: ['./editar-estadistica.component.scss'],
})
export class EditarEstadisticaComponent implements OnInit {
    ubicacion: Ubicacion;
    categorias: CategoriaEstadistica[];

    idVirus: number;
    virus: Virus;

    graficaEstadistica: GraficaEdtadistica;
    segundaCategoria: boolean;
    fecha: string;
    idUbicacion: number;

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
        this.graficaEstadistica = null;
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: false } as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        await this.obtenerCategorias();
        this.obtenerVirus();

        this.graficaEstadistica = new GraficaEdtadistica(this.idVirus, 0);
        this.graficaEstadistica.ubicacion = this.ubicacion;
        this.graficaEstadistica.tipoGrafica = 'bar';
        // this.graficaEstadistica.filtrarEstadisticas(this.sidvi);
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
        this.graficaEstadistica.categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.graficaEstadistica.idCategoriaSelected, 10) );
        this.graficaEstadistica.subcategoriaSelected = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.graficaEstadistica.idSubcategoriaSelected = '-1';
    }
    updateSubcategoria() {
        this.graficaEstadistica.subcategoriaSelected = this.graficaEstadistica.categoriaSelected.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.graficaEstadistica.idSubcategoriaSelected, 10) );
    }
    updateCategoriaGrupo() {
        this.graficaEstadistica.categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.graficaEstadistica.idCategoriaSelectedGrupo, 10) );
        this.graficaEstadistica.subcategoriaSelectedGrupo = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.graficaEstadistica.idSubcategoriaSelectedGrupo = '-1';
    }
    updateSubcategoriaGrupo() {
        this.graficaEstadistica.subcategoriaSelectedGrupo = this.graficaEstadistica.categoriaSelectedGrupo.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.graficaEstadistica.idSubcategoriaSelectedGrupo, 10) );
    }

    filtrarEstadisticas() {
        if (this.idUbicacion == null) {
            Swal.fire({title: 'Selecciona una ubicacion invalida', icon: 'error', backdrop: false});
            return;
        }
        if (this.fecha == null || this.fecha === '') {
            Swal.fire({title: 'fecha invalida', icon: 'error', backdrop: false});
            return;
        }
        this.graficaEstadistica.subcategoriaEjeHorizontal = 2;
        this.graficaEstadistica.agrupacionOpcion = this.segundaCategoria ? 3 : 1;
        this.graficaEstadistica.filtrarEstadisticas(this.sidvi);
    }

}
