import { Component, OnInit } from '@angular/core';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import { ActivatedRoute } from '@angular/router';
import { IUbicacion, Ubicacion, Virus, CategoriaEstadistica, SubcategoriaEstadistica, Estadistica } from 'src/models';
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

        this.sidvi.estadistica.listarEstadisticas(this.idVirus, null, fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2, null, null, null, null, 'fecha', OrderModeEnum.ASC).subscribe(
            estadis => {
                this.estadisticas = estadis.resultados.map((item: any) => new Estadistica(item));
                console.log(this.estadisticas);
        });
    }

    guardarEstadistica() {

    }

}
