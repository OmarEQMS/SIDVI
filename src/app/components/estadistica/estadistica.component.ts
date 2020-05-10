import { Component, OnInit } from '@angular/core';
import { Ubicacion, Estadistica, IUbicacion, CategoriaEstadistica, Virus, ICategoriaEstadistica, IEstadistica, SubcategoriaEstadistica } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';

class EstadisticaValue {
    total: number;
    seleccionados: number;

    constructor(total: number, seleccionados: number) {
        this.total = total;
        this.seleccionados = seleccionados;
    }
}

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
    ubicacion: Ubicacion;
    categorias: CategoriaEstadistica[];
    categoriaSelected: CategoriaEstadistica;
    subcategoriaSelected: SubcategoriaEstadistica;
    categoriaSelectedGrupo: CategoriaEstadistica;
    subcategoriaSelectedGrupo: SubcategoriaEstadistica;

    subcategoriaEjeHorizontal: boolean;
    agrupacionOpcion: number;

    estadisticas: SubcategoriaEstadistica[];
    idVirus: number;
    virus: Virus;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute
    ) {
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        this.virus = new Virus();
        this.categoriaSelectedGrupo = new CategoriaEstadistica();
        this.categoriaSelected = new CategoriaEstadistica();
        this.subcategoriaEjeHorizontal = true;
        this.agrupacionOpcion = 1;
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.categoriaSelectedGrupo = new CategoriaEstadistica();
        this.categoriaSelected = new CategoriaEstadistica();
        this.estadisticas = new Array(0);
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        this.filtrarEstadisticas();
        this.obtenerVirus();
        this.obtenerCategorias();
    }

    obtenerVirus() {
        this.sidvi.virus.obtenerVirus(this.idVirus).subscribe(
            virus => {
                this.virus = new Virus(virus);
        });
    }

    obtenerCategorias() {
        this.sidvi.categoriaEstadistica.listarCategoriaEstadistica().subscribe(
            categorias => {
                this.categorias = categorias.resultados.map((item: any) => new CategoriaEstadistica(item));
                this.categoriaSelected = this.categorias[0];
                this.categoriaSelectedGrupo = this.categorias[0];
        });
    }

    updateCategoria(idCategoriaSelected: string) {
        this.categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(idCategoriaSelected, 10) );
    }
    updateSubcategoria(idSubcategoriaSelected: string) {
        this.subcategoriaSelected = this.categoriaSelected.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(idSubcategoriaSelected, 10) );
    }
    updateCategoriaGrupo(idCategoriaSelectedGrupo: string) {
        this.categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(idCategoriaSelectedGrupo, 10) );
    }
    updateSubcategoriaGrupo(idSubcategoriaSelectedGrupo: string) {
        this.subcategoriaSelectedGrupo = this.categoriaSelectedGrupo.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(idSubcategoriaSelectedGrupo, 10) );
    }

    filtrarEstadisticas() {
        this.estadisticas = new Array(0);

        this.sidvi.estadistica.listarEstadisticas(this.idVirus, null, null, null, null, null, null, null, 'fecha', OrderModeEnum.ASC).subscribe(
            estadis => {

        });
    }

    calculateEstadistica(ubicacion: Ubicacion): EstadisticaValue {
        const newEstadisticaValue = new EstadisticaValue(0, 0);
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                const hijoEstadisticaValue = this.calculateEstadistica(ubi);
                newEstadisticaValue.total += hijoEstadisticaValue.total;
                newEstadisticaValue.seleccionados += hijoEstadisticaValue.seleccionados;
            }
            const ubiOtros = ubicacion.ubicaciones.find((item: Ubicacion) => item.nombre === 'Otros');
            if (ubiOtros != null) { ubiOtros.localEstadistica.valor = ubicacion.localEstadistica.valor - newEstadisticaValue.total; }

            if (ubicacion.localSelected) {
                newEstadisticaValue.seleccionados += ubiOtros ? ubiOtros.localEstadistica.valor : 0;
            }
        } else {
            if (ubicacion.localSelected) {
                newEstadisticaValue.seleccionados = ubicacion.localEstadistica.valor;
            } else {
                newEstadisticaValue.seleccionados = 0;
            }
        }

        newEstadisticaValue.total = ubicacion.localEstadistica.valor;
        ubicacion.localEstadistica.valor = newEstadisticaValue.seleccionados;

        return newEstadisticaValue;
    }


    setEstadisticaInUbicacion(ubicacion: Ubicacion, estadistica: Estadistica) {
        if (ubicacion.idUbicacion === estadistica.fkUbicacion) {
            ubicacion.localEstadistica.idEstadistica = estadistica.idEstadistica;
            ubicacion.localEstadistica.valor = estadistica.valor;
            return;
        }
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setEstadisticaInUbicacion(ubi, estadistica);
            }
        }
    }

    setUbicacion(ubicacion: Ubicacion, estadistica: Estadistica, main: boolean) {
        estadistica.fkUbicacion = ubicacion.idUbicacion;
        ubicacion.localEstadistica = new Estadistica(estadistica);
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            if (!main) {
                const otrosUbicacion = new Ubicacion({ubicacion} as IUbicacion);
                otrosUbicacion.idUbicacion = -1;
                otrosUbicacion.fkUbicacion = ubicacion.idUbicacion;
                otrosUbicacion.nombre = 'Otros';
                ubicacion.ubicaciones.push(otrosUbicacion);
            }
            for (const ubi of ubicacion.ubicaciones) {
                this.setUbicacion(ubi, estadistica, false);
            }
        }
    }

    setUbicacionCopia(ubicacion: Ubicacion, estadistica: Estadistica) {
        const valor = ubicacion.localEstadistica.valor;
        estadistica.fkUbicacion = ubicacion.idUbicacion;
        ubicacion.localEstadistica = new Estadistica(estadistica);
        ubicacion.localEstadistica.valor = valor;
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setUbicacionCopia(ubi, estadistica);
            }
        }
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

}
