import { Component, OnInit } from '@angular/core';
import { Ubicacion } from 'src/models';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
    ubicacion: Ubicacion;

    constructor() {
        this.ubicacion = new Ubicacion();
    }

    ngOnInit() {}
    ionViewWillEnter() {
        this.ubicacion = new Ubicacion();
    }

}
