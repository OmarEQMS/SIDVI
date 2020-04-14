import { Component, OnInit } from '@angular/core';
import {SIDVIServices} from '../../../api';
import {Router} from '@angular/router';
import { Virus } from 'src/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-virus-list-all',
  templateUrl: './virus-list-all.component.html',
  styleUrls: ['./virus-list-all.component.scss'],
})
export class VirusListAllComponent implements OnInit {

   viruss: Virus[];
  constructor(private SIDVI: SIDVIServices, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.SIDVI.virus.listarVirus().subscribe(
      res => {
        this.viruss = res.resultados;
        for (const virus of this.viruss) {
          virus.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(virus.archivoIcono as string);
        }
        console.log(this.viruss);
      },
      err => {
        console.log(err);

      }
    );
  }

}
