import { Ubicacion, CategoriaEstadistica, SubcategoriaEstadistica, Estadistica, _Estadistica, IUbicacion } from 'src/models';
import { SIDVIServices, OrderModeEnum } from 'src/api';

class EstadisticaValue {
    total: number;
    seleccionados: number;

    constructor(total: number, seleccionados: number) {
        this.total = total;
        this.seleccionados = seleccionados;
    }
}

export class GraficaEdtadistica {
    // Static
    public static staticCategorias: CategoriaEstadistica[];
    public static staticUbicacion: Ubicacion;

    // Settings
    categoriaSelected: CategoriaEstadistica;
    subcategoriaSelected: SubcategoriaEstadistica;
    categoriaSelectedGrupo: CategoriaEstadistica;
    subcategoriaSelectedGrupo: SubcategoriaEstadistica;
    subcategoriaEjeHorizontal: number;
    agrupacionOpcion: number;
    tipoGrafica: string;
    idVirus: number;

    // Data
    localUbicaciones: Ubicacion[];

    // Grafica
    nombre: string;
    localChartType = 'bar';
    localChartDatasets: Array<any> = [{ data: [], label: '' }];
    localChartLabels: Array<string> = [];
    localChartColors: Array<any> = [{
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }];
    localChartOptions: any = { responsive: true, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

    constructor(idVirus: number) {
        this.categoriaSelectedGrupo = new CategoriaEstadistica();
        this.categoriaSelected = new CategoriaEstadistica();
        this.subcategoriaEjeHorizontal = 1;
        this.agrupacionOpcion = 1;
        this.tipoGrafica = '-1';
        this.idVirus = idVirus;
    }

    filtrarEstadisticas(sidvi: SIDVIServices) {
        this.nombre = 'Omar';
        sidvi.estadistica.listarEstadisticas(this.idVirus, null, null, null, null, null, null, null, 'fecha', OrderModeEnum.ASC).subscribe(
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

}
