import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { Usuario } from 'src/models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  contrasena: string;

  constructor(private sidvi: SIDVIServices, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() { }

  registrar() {

    if (this.usuario.contrasena !== this.contrasena) {
      console.error('Las contraseñas no coinciden');
    }

    this.sidvi.usuario.crearUsuario(this.usuario).subscribe(
      res => {
        // tslint:disable-next-line: max-line-length
        Swal.fire({ title: '¡Listo!', text: 'Cuenta registrada correctamente', icon: 'success', heightAuto: false }).then((result) => {
          this.router.navigate(['./login']);
        });
      },
      error => {
        console.error(error);
      }
    );
  }

}
