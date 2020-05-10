import { Ubicacion } from 'src/models';


export class GraficaEdtadistica {
    nombre: string;

    localUbicaciones: Ubicacion[];

    localChartType = 'bar';
    localChartDatasets: Array<any> = [{ data: [], label: '' }];
    localChartLabels: Array<string> = [];
    localChartColors: Array<any> = [{
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }];
    localChartOptions: any = { responsive: true, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

    constructor() {

    }


}
