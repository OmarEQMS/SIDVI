import { Component, OnInit } from '@angular/core';
import {SIDVIServices} from '../../../api';
import {Router} from '@angular/router';
import { Virus } from 'src/models';

@Component({
  selector: 'app-virus-list-all',
  templateUrl: './virus-list-all.component.html',
  styleUrls: ['./virus-list-all.component.scss'],
})
export class VirusListAllComponent implements OnInit {

   viruss: Virus[];
  constructor(private SIDVI: SIDVIServices, private router: Router) { }

  ngOnInit() {
    this.getViruss();
  }

  getViruss() {
    this.SIDVI.virus.listarVirus().subscribe(
      res => {
        this.viruss = res.resultados;
        console.log(this.viruss);
      },
      err => {
        console.log(err);

      }
    );
  }

}
