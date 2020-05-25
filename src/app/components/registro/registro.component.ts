import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { Usuario, _Usuario } from 'src/models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  contrasenaCopy: string;
  fieldValidations = {
    'nombreCompleto' : true,
    'usuario': true,
    'correo': true,
    'celular': true,
    'contrasena': true
  };
  constructor(private sidvi: SIDVIServices, private router: Router) {
    this.usuario = new Usuario({rol: _Usuario.Rol.USUARIO});
  }

  ngOnInit() {
    this.resetValidators();
   }

  registrar() {
    this.sidvi.usuario.crearUsuario(this.usuario).subscribe(
      res => {
        if (res.type === _APIResponse.TypeEnum.SUCCESS) {
          Swal.fire({ title: '¡Listo!', text: 'Cuenta registrada correctamente', icon: 'success', heightAuto: false }).then((result) => {
            this.router.navigate(['./login']);
          });
        } else {
          Swal.fire({ title: 'Opps!', text: 'Ocurrió un error', icon: 'error', heightAuto: false }).then((result) => {
            this.router.navigate(['./login']);
          });
        }
        this.resetValidators();
      },
      error => {
        console.error(error);
        Swal.fire({ title: 'Opps!', text: 'Ocurrió un error', icon: 'error', heightAuto: false }).then((result) => {
          this.router.navigate(['./login']);
        });
        this.resetValidators();
      }
    );
  }

  validateField(key, input) {
    if (input === '') {
      this.fieldValidations[key] = false;
    } else {
      this.fieldValidations[key] = true;
    }
  }

  resetValidators() {
    for (let key in this.fieldValidations) {
      if (this.fieldValidations[key]) {
        this.fieldValidations[key] = true; // Use `key` and `value`
      }
    }
  }

  validateAll() {
    let valid = true;
    if (this.fieldValidations.nombreCompleto === false) {
      valid = false;
    } else if ( this.fieldValidations.usuario === false) {
      valid = false;
    } else if ( this.fieldValidations.correo === false) {
      valid = false;
    } else if (this.fieldValidations.celular === false) {
      valid = false;
    }

    if (this.contrasenaCopy !== this.usuario.contrasena) {
      this.fieldValidations.contrasena = false;
      valid = false;
    }

    if (valid) {
      this.registrar();
    }
  }

}
