import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from '../../../api';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TestNodo } from 'src/models';

@Component({
  selector: 'app-listar-preguntas',
  templateUrl: './listar-preguntas.component.html',
  styleUrls: ['./listar-preguntas.component.scss'],
})
export class ListarPreguntasComponent implements OnInit {

  testNodos: TestNodo[];

  constructor(private SIDVI: SIDVIServices, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.SIDVI.testNodo.listarTestNodos().subscribe(
      res => {
        this.testNodos = res.resultados.map((item: any) => new TestNodo(item));
      },
      err => {
        console.log(err);

      }
    );
  }


}
