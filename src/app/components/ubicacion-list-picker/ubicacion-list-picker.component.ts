import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion, IUbicacion } from 'src/models';
import { SIDVIServices } from 'src/api';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ubicacion-list-picker',
  templateUrl: './ubicacion-list-picker.component.html',
  styleUrls: ['./ubicacion-list-picker.component.scss'],
})
export class UbicacionListPickerComponent implements OnInit {
  @Input() ubicacion: Ubicacion;
  @Input() ubicacionIds: Number[];
  seleccionadaId: Number = -1;
  ubicacionAux: Ubicacion;
  ids: Number[];
  icons: { [id: string]: IconDefinition } = {
      plus: faChevronRight,
      minus: faChevronDown,
      guion: faMinus
  };

  constructor(private sidvi: SIDVIServices) {
   }

  ngOnInit() {

   }

  expandUbicacion(ubicacion: Ubicacion) {
    if (ubicacion.localVisible) {
        ubicacion.localVisible = false;
        ubicacion.localIcono = this.icons.plus;
    } else if (ubicacion.localPadre) {
        ubicacion.localVisible = true;
        ubicacion.localIcono = this.icons.minus;
    }
}

selectUbicacion(ubicacion: Ubicacion) {
  this.changeUbicacion(ubicacion, (this.seleccionadaId == ubicacion.idUbicacion));
}

changeUbicacion(ubicacion: Ubicacion, alreadySelected: boolean) {
  if (alreadySelected) {
     ubicacion.localSelected = false;
     this.seleccionadaId = -1;
  }else{  
    //Volver localSelected = false a TODOS en la tabla
    ubicacion.localSelected = true;
    this.seleccionadaId = ubicacion.idUbicacion;

  }

}




}
