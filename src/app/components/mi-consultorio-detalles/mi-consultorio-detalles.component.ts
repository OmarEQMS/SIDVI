import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion, IUbicacion, Medico } from 'src/models';
@Component({
  selector: 'app-mi-consultorio-detalles',
  templateUrl: './mi-consultorio-detalles.component.html',
  styleUrls: ['./mi-consultorio-detalles.component.scss'],
})
export class MiConsultorioDetallesComponent implements OnInit {
  @Input() consultorio: Medico;
  constructor() { }

  ngOnInit() {}

}
