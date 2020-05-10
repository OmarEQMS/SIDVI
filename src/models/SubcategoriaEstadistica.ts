import {  Estadistica } from '../models';
import { ContentTypeEnum, Defaults } from '../api';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { Ubicacion } from './Ubicacion';

// tslint:disable-next-line:no-namespace
export namespace _SubcategoriaEstadistica {

}

export interface ISubcategoriaEstadistica {
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;
}

export class SubcategoriaEstadistica implements ISubcategoriaEstadistica {
    // Columns
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;

    // Relations: BelongsToOne
    categoriaEstadistica: CategoriaEstadistica;

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
    constructor(subcategoriaEstadistica?: any) {
        if (subcategoriaEstadistica != null) {
            this.idSubcategoriaEstadistica = subcategoriaEstadistica.idSubcategoriaEstadistica;
            this.fkCategoriaEstadistica = subcategoriaEstadistica.fkCategoriaEstadistica;
            this.nombre = subcategoriaEstadistica.nombre;
        }
        this.localUbicaciones = new Array(0);
    }

    // ToObjectDB
    toObjectDB() {
        return {
            idSubcategoriaEstadistica: this.idSubcategoriaEstadistica,
            fkCategoriaEstadistica: this.fkCategoriaEstadistica,
            nombre: this.nombre
        };
    }

}
