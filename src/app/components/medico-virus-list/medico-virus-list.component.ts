import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SIDVIServices, Defaults, ContentTypeEnum } from 'src/api';
import { Medico, MedicoVirus} from 'src/models';

@Component({
  selector: 'app-medico-virus-list',
  templateUrl: './medico-virus-list.component.html',
  styleUrls: ['./medico-virus-list.component.scss'],
})
export class MedicoVirusListComponent implements OnInit {
  medicosVirus: MedicoVirus[];
  idVirus: number;
  constructor(  private sidvi: SIDVIServices,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer
  ) {
   }

  ngOnInit() {}
  ionViewWillEnter() {
    this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
    this.sidvi.medicoVirus.listarMedicosVirus(null , this.idVirus).subscribe(
      res => {
        this.medicosVirus = res.resultados.map((item: any) => new MedicoVirus(item));
        for (const medicoVirus of this.medicosVirus) {
          medicoVirus.medico.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(medicoVirus.medico.archivoFoto as string);
          console.log( medicoVirus.medico.archivoIconoImg);
        }
      },
      err => {
        console.log(err);

      }
    );
  }

}
