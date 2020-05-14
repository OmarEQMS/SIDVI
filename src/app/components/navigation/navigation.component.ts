import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, _Usuario } from '../../../models/index';
import { SIDVIServices } from 'src/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  rout: string;
  haySesion: boolean = false;
  rol: _Usuario.Rol;
  constructor(private router: Router, private sidvi: SIDVIServices) {
    this.rol = this.sidvi.manager.usuario.rol;
    console.log('cons ' + this.haySesion);
  }

  ngOnInit(): void {
    this.rout = localStorage.getItem('rout');
    if ( this.sidvi.manager.usuario !== null) {
      this.haySesion = true;
    } else {
      this.haySesion = false;
    }
    console.log('cons ' + this.haySesion);

  }

  logout() {
    localStorage.clear();
    this.haySesion = false;
    this.router.navigate(['./login']);
  }

  miPerfil() {
    if (this.rol === _Usuario.Rol.ADMINISTRADOR) {
      this.router.navigate(['./administrador/perfil']);
    } else {
      this.router.navigate(['./perfil']);
    }
  }
  verOpciones(){
    console.log("opciones");
    console.log(this.haySesion);
  }
}

