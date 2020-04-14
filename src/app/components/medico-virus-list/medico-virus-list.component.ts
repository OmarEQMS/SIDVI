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
  medicos: Medico[];
  medicosVirus: MedicoVirus[];
  idVirus: number;
  constructor(  private sidvi: SIDVIServices,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer
  ) {
   }

  ngOnInit() {}
  ionViewWillEnter() {
    console.log('MEDICOS1');
    this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'), 10);
    this.sidvi.medicoVirus.listarMedicosVirus().subscribe(
      res => {
       for (const resultado of res.resultados) {
          this.medicos = resultado.medico;
        }
      },
      err => {
        console.log(err);

      }
    );
  }

}
