import { Component, OnInit } from '@angular/core';
import { Ubicacion, IUbicacion } from 'src/models';
import { SIDVIServices } from 'src/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-editar-catalogos',
  templateUrl: './editar-catalogos.component.html',
  styleUrls: ['./editar-catalogos.component.scss'],
})
export class EditarCatalogosComponent implements OnInit {

  ubicacion: Ubicacion;
  ubicacionesIds: number[];

  icons: { [id: string]: IconDefinition } = {
    plus: faChevronRight,
    minus: faChevronDown,
    guion: faMinus
  };

  constructor(
    private sidvi: SIDVIServices,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.ubicacion = new Ubicacion({ idUbicacion: -1, localSelected: false });
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.getUbicacionesHijo(this.ubicacion);
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

  ubicacionSelected(idUbicacion: number) {
    console.log(idUbicacion);
  }

}
