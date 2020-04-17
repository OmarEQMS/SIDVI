import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Virus } from 'src/models';

@Component({
  selector: 'app-virus',
  templateUrl: './virus.component.html',
  styleUrls: ['./virus.component.scss'],
})
export class VirusComponent implements OnInit {

  idVirus: number;
  virus: Virus;

  constructor(private _SIDVI: SIDVIServices, private router: Router,
              private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.virus = new Virus();
  }

  ngOnInit() {

    // Obtener el id del virus
    this.idVirus = parseInt(this.activatedRoute.snapshot.paramMap.get('idVirus'));
    console.log(this.idVirus);

    this._SIDVI.virus.obtenerVirus(this.idVirus).subscribe(
      res => {
        this.virus = res;
        console.log(this.virus);
      },
      err => console.error(err)
    );
  }

}
