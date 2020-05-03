import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/index';
import { SIDVIServices } from 'src/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  idUsuario: number;

  constructor(private sidvi: SIDVIServices) {
    this.usuario = new Usuario(); // se inicializa para que no marque error antes de que asigne el usuario.
   }

  ngOnInit() {
    this.idUsuario = this.sidvi.manager.usuario.idUsuario;
    this.obtenerUsuario(this.idUsuario);
  }

  obtenerUsuario( id: number ) {
    this.sidvi.usuario.obtenerUsuario(id)
    .subscribe(
      res => {
        console.log(res);
        this.usuario = res;
        }, err => { console.log(err); }
      );
  }

}
