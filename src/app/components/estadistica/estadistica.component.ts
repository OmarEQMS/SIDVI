import { Component, OnInit } from '@angular/core';
import { Ubicacion, Estadistica, IUbicacion, CategoriaEstadistica, Virus, ICategoriaEstadistica, IEstadistica, SubcategoriaEstadistica } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import { DatePipe } from '@angular/common';
import { parse } from 'querystring';
import { GraficaEdtadistica } from 'src/app/extra/GraficaEdtadistica';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
    ubicacion: Ubicacion;
    categorias: CategoriaEstadistica[];

    idVirus: number;
    virus: Virus;

    graficasEstadisticas: GraficaEdtadistica[];
    editandoGrafica: GraficaEdtadistica;

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
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: true } as IUbicacion);
        this.virus = new Virus();
        this.graficasEstadisticas = new Array();
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1, localSelected: true } as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        await this.obtenerCategorias();
        this.obtenerVirus();

        this.graficasEstadisticas = new Array();
        // Casos Activos por tiempo
        this.graficasEstadisticas.push(new GraficaEdtadistica(this.idVirus, this.graficasEstadisticas.length));
        this.graficasEstadisticas[0].ubicacion = new Ubicacion(this.ubicacion, this.ubicacion.ubicaciones);
        this.graficasEstadisticas[0].categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.nombre === 'Casos');
        this.graficasEstadisticas[0].idCategoriaSelected = this.graficasEstadisticas[0].categoriaSelected.idCategoriaEstadistica.toString();
        this.graficasEstadisticas[0].subcategoriaSelected = this.graficasEstadisticas[0].categoriaSelected.subcategoriaEstadisticas
                .find((item: SubcategoriaEstadistica) => item.nombre === 'Casos Activos');
        this.graficasEstadisticas[0].idSubcategoriaSelected = this.graficasEstadisticas[0].subcategoriaSelected.idSubcategoriaEstadistica.toString();
        this.graficasEstadisticas[0].subcategoriaEjeHorizontal = 2;
        this.graficasEstadisticas[0].tipoGrafica = 'bar';
        this.graficasEstadisticas[0].filtrarEstadisticas(this.sidvi);

        // Edad por Genero
        this.graficasEstadisticas.push(new GraficaEdtadistica(this.idVirus, this.graficasEstadisticas.length));
        this.graficasEstadisticas[1].ubicacion = new Ubicacion(this.ubicacion, this.ubicacion.ubicaciones);
        this.graficasEstadisticas[1].categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.nombre === 'Edad');
        this.graficasEstadisticas[1].idCategoriaSelected = this.graficasEstadisticas[1].categoriaSelected.idCategoriaEstadistica.toString();
        this.graficasEstadisticas[1].subcategoriaEjeHorizontal = 1;
        this.graficasEstadisticas[1].agrupacionOpcion = 2;
        this.graficasEstadisticas[1].categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.nombre === 'Genero');
        this.graficasEstadisticas[1].idCategoriaSelectedGrupo = this.graficasEstadisticas[1].categoriaSelectedGrupo.idCategoriaEstadistica.toString();
        this.graficasEstadisticas[1].tipoGrafica = 'bar';
        this.graficasEstadisticas[1].filtrarEstadisticas(this.sidvi);
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

    updateCategoria() {
        this.editandoGrafica.categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.editandoGrafica.idCategoriaSelected, 10) );
    }
    updateSubcategoria() {
        this.editandoGrafica.subcategoriaSelected = this.editandoGrafica.categoriaSelected.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.editandoGrafica.idSubcategoriaSelected, 10) );
    }
    updateCategoriaGrupo() {
        this.editandoGrafica.categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(this.editandoGrafica.idCategoriaSelectedGrupo, 10) );
    }
    updateSubcategoriaGrupo() {
        this.editandoGrafica.subcategoriaSelectedGrupo = this.editandoGrafica.categoriaSelectedGrupo.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(this.editandoGrafica.idSubcategoriaSelectedGrupo, 10) );
    }

    filtrarEstadisticas() {
        this.editandoGrafica.filtrarEstadisticas(this.sidvi);
        this.editandoGrafica = null;
    }

    agregarGrafica() {
        this.graficasEstadisticas.push(new GraficaEdtadistica(this.idVirus, this.graficasEstadisticas.length));
    }

    editarGrafica(grafica: GraficaEdtadistica) {
        this.editandoGrafica = grafica;
    }

    eliminarGrafica(grafica: GraficaEdtadistica) {
        this.graficasEstadisticas.splice(grafica.identificador, 1);
    }
}
