import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { _Usuario } from 'src/models';
import { _APIResponse, APIResponse } from 'src/api/APIResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(private sidvi: SIDVIServices, private router: Router) {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.sidvi.usuario.autenticacion(this.loginForm.value.usuario, this.loginForm.value.password).subscribe(
      res => {

        if (res.type === _APIResponse.TypeEnum.SUCCESS) {
          this.sidvi.manager.setItems(res.extra.token, res.extra.usuario);
          if (this.sidvi.manager.usuario.rol === _Usuario.Rol.ADMINISTRADOR) {
            this.router.navigate(['./administrador']);
          }
          if (this.sidvi.manager.usuario.rol === _Usuario.Rol.USUARIO) {
            this.router.navigate(['./virus']);
          }
        } else {
          Swal.fire({ title: 'Error', text: 'Nombre de usuario o contraseña inválidos.', icon: 'error', heightAuto: false });
        }
      },
      error => {
        alert('No se pudo loguear');
      }
    );
  }

}
