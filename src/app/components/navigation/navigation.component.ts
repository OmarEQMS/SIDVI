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
  haySesion = false;
  rol: _Usuario.Rol;
  constructor(private router: Router, private sidvi: SIDVIServices) {

    if (this.sidvi.manager.usuario != null) {
      this.haySesion = true;
      this.rol = this.sidvi.manager.usuario.rol;
    } else {
      this.haySesion = false;
    }

    console.log('cons ' + this.haySesion);
  }

  ngOnInit(): void {
    this.rout = localStorage.getItem('rout');
    console.log('cons ' + this.haySesion);
  }

  logout() {
    this.sidvi.manager.unsetItems();
    this.sidvi.usuario.cerrarSesion().subscribe();
    this.haySesion = false;
    this.router.navigate(['./login']);
  }

  miPerfil() {
    if (this.rol === _Usuario.Rol.ADMINISTRADOR) {
      this.router.navigate(['./administrador/perfil']);
    } else if (this.rol === _Usuario.Rol.USUARIO) {
      this.router.navigate(['./perfil']);
    }
  }
  verOpciones() {
    console.log('opciones');
    console.log(this.haySesion);
  }
}

