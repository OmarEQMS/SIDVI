import { Component, OnInit } from '@angular/core';
import { Ubicacion, Estadistica, IUbicacion, CategoriaEstadistica, Virus, ICategoriaEstadistica, IEstadistica, SubcategoriaEstadistica } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
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
        guion: faMinus
    };

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute
    ) {
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        this.virus = new Virus();
        this.graficasEstadisticas = new Array();
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.graficasEstadisticas = new Array();
        this.graficasEstadisticas.push(new GraficaEdtadistica(this.idVirus));
        this.editandoGrafica = this.graficasEstadisticas[0];

        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        GraficaEdtadistica.staticUbicacion = this.ubicacion;
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
                GraficaEdtadistica.staticCategorias = categorias;
        });
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

    updateCategoria(idCategoriaSelected: string) {
        this.editandoGrafica.categoriaSelected = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(idCategoriaSelected, 10) );
    }
    updateSubcategoria(idSubcategoriaSelected: string) {
        this.editandoGrafica.subcategoriaSelected = this.editandoGrafica.categoriaSelected.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(idSubcategoriaSelected, 10) );
    }
    updateCategoriaGrupo(idCategoriaSelectedGrupo: string) {
        this.editandoGrafica.categoriaSelectedGrupo = this.categorias.find((item: CategoriaEstadistica) => item.idCategoriaEstadistica === parseInt(idCategoriaSelectedGrupo, 10) );
    }
    updateSubcategoriaGrupo(idSubcategoriaSelectedGrupo: string) {
        this.editandoGrafica.subcategoriaSelectedGrupo = this.editandoGrafica.categoriaSelectedGrupo.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica === parseInt(idSubcategoriaSelectedGrupo, 10) );
    }

    filtrarEstadisticas() {
        this.editandoGrafica.filtrarEstadisticas(this.sidvi);
    }

}
