import { Estadistica } from './Estadistica';
import { ContentTypeEnum, Defaults } from '../api/API';
import { Ubicacion } from './Ubicacion';

// tslint:disable-next-line:no-namespace
export namespace _CategoriaEstadistica {
}

export interface ICategoriaEstadistica {
    idCategoriaEstadistica?: number;
    nombre?: string;
}

export class CategoriaEstadistica implements ICategoriaEstadistica {
    // Columns
    idCategoriaEstadistica?: number;
    nombre?: string;

    // Relations: BelongsToOne

    // Relations: HasMany
    estadisticas: Estadistica[];

    // Local
    localUbicaciones: Ubicacion[]; // Solo los padres en diferentes fechas
    localChartType = 'bar';
    localChartDatasets: Array<any> = [{ data: [], label: '' }];
    localChartLabels: Array<string> = [];
    localChartColors: Array<any> = [{
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }];
    localChartOptions: any = { responsive: true, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

    // Constructor
    constructor(categoriaEstadistica?: any) {
        if (categoriaEstadistica !== undefined) {
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;
        }
        this.localUbicaciones = new Array(0);
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idCategoriaEstadistica: this.idCategoriaEstadistica,
            nombre: this.nombre
        };
    }

    // Local
    localSetChart() {
        this.localChartLabels = this.localUbicaciones.map((item: Ubicacion) => item.localEstadistica.localFecha);
        const data: number[] = new Array<number>(this.localUbicaciones.length);
        for (let i = 0; i < this.localUbicaciones.length; i++) {
          data[i] = this.localUbicaciones[i].localEstadistica.valor;
        }
        this.localChartDatasets = [{ data, label: '' }];
    }
}
