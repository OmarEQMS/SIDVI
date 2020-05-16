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
  }

  ngOnInit(): void {
    this.rout = localStorage.getItem('rout');
  }

  logout() {
    this.sidvi.usuario.cerrarSesion().subscribe(res => {
      this.sidvi.manager.unsetItems();
    },
      error => console.error(error)
    );
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

  }
}

