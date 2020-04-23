import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { _Usuario } from 'src/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(private _SIDVI: SIDVIServices, private _router: Router) {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.loginForm);
    this._SIDVI.usuario.autenticacion(this.loginForm.value.usuario, this.loginForm.value.password).subscribe(
      res => {
        if (res) {

          // tslint:disable-next-line: triple-equals
          if (res.statusCode == 200) {
            console.log(res);
            this._SIDVI.manager.setItems(res.extra.token, res.extra.usuario);
            if (this._SIDVI.manager.usuario.rol === _Usuario.Rol.ADMINISTRADOR) {
                this._router.navigate(['./administrador']);
            } else {
                this._router.navigate(['./virus']);
            }
          } else {
            // tslint:disable-next-line: max-line-length
            Swal.fire({ title: 'Error', text: 'Nombre de usuario o contraseña inválidos. Redireccionando a página principal', icon: 'error', heightAuto: false }).then((result) => {
              if (result.value) {
                this._router.navigate(['./virus']);
              }
            });
          }

        }
      },
      error => {
        alert('No se pudo loguear');
      }
    );
  }

}
