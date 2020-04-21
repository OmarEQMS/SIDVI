import { Component, OnInit } from '@angular/core';
import { Ubicacion, Estadistica, IUbicacion, CategoriaEstadistica, Virus, ICategoriaEstadistica, IEstadistica } from 'src/models';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import { DatePipe } from '@angular/common';

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
    estadisticas: CategoriaEstadistica[];
    idVirus: number;
    virus: Virus;

    icons: { [id: string]: IconDefinition } = {
        plus: faChevronRight,
        minus: faChevronDown,
        guion: faMinus
    };

    filtroFechaInicio: string;
    filtroFechaFinal: string;

    constructor(
        private sidvi: SIDVIServices,
        private activatedRoute: ActivatedRoute
    ) {
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        this.virus = new Virus();
    }

    ngOnInit() {}
    async ionViewWillEnter() {
        this.estadisticas = new Array(0);
        this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
        this.ubicacion = new Ubicacion({idUbicacion: -1} as IUbicacion);
        await this.getUbicacionesHijo(this.ubicacion);
        this.filtrarEstadisticas();
        this.obtenerVirus();
    }

    obtenerVirus() {
        this.sidvi.virus.obtenerVirus(this.idVirus).subscribe(
            virus => {
                this.virus = new Virus(virus);
        });
    }

    filtrarEstadisticas() {
        this.estadisticas = new Array(0);

        this.sidvi.estadistica.listarEstadisticas(this.idVirus, null, null, this.filtroFechaInicio, this.filtroFechaFinal,
                                                  'fecha', OrderModeEnum.ASC).subscribe(
            estadis => {
                const arrEstadisticas: Estadistica[] = estadis.resultados.map((item: any) => new Estadistica(item));

                for (const estadistica of arrEstadisticas) {
                    let buscarCategoria = this.estadisticas.find((item: CategoriaEstadistica) =>
                                                                        item.idCategoriaEstadistica === estadistica.fkCategoriaEstadistica);
                    if (buscarCategoria == null) { // Si es una nueva estadistica, la agrego
                        const newCategoria = new CategoriaEstadistica(estadistica.categoriaEstadistica);
                        const newUbicacion = new Ubicacion(this.ubicacion, this.ubicacion.ubicaciones);
                        const generalEstadistica = new Estadistica({fkVirus: this.idVirus,
                                                                    fkCategoriaEstadistica: newCategoria.idCategoriaEstadistica,
                                                                    fecha: estadistica.fecha,
                                                                    valor: 0,
                                                                    categoriaEstadistica: newCategoria
                                                                });
                        this.setUbicacion(newUbicacion, generalEstadistica, true);
                        newCategoria.localUbicaciones.push(newUbicacion);
                        this.estadisticas.push(newCategoria);
                        buscarCategoria = newCategoria;
                    }
                    let buscarFechaUbicacion = buscarCategoria.localUbicaciones.find((item: Ubicacion) =>
                                                                            item.localEstadistica.localFecha === estadistica.localFecha);
                    if (buscarFechaUbicacion == null) {
                        buscarFechaUbicacion = buscarCategoria.localUbicaciones[buscarCategoria.localUbicaciones.length - 1];
                        const newUbicacion = new Ubicacion(buscarFechaUbicacion, buscarFechaUbicacion.ubicaciones,
                                                           buscarFechaUbicacion.localEstadistica);
                        const generalEstadistica = new Estadistica({fkVirus: this.idVirus,
                                                                    fkCategoriaEstadistica: buscarCategoria.idCategoriaEstadistica,
                                                                    fecha: estadistica.fecha,
                                                                    valor: 0,
                                                                    categoriaEstadistica: buscarCategoria
                                                                });
                        this.setUbicacionCopia(newUbicacion, generalEstadistica);
                        buscarCategoria.localUbicaciones.push(newUbicacion);
                        buscarFechaUbicacion = newUbicacion;
                    }
                    this.setEstadisticaInUbicacion(buscarFechaUbicacion, estadistica);
                }

                for (const estadistica of this.estadisticas) {
                    for (const ubicacion of estadistica.localUbicaciones) {
                        this.calculateEstadistica(ubicacion);
                    }
                    estadistica.localSetChart();
                }

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
