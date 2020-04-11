import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';

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
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;

    this._SIDVI.usuario.autenticacion(usuario, password).subscribe(
      res => {
        if (res) {

          // tslint:disable-next-line: triple-equals
          if (res.statusCode == 200) {
            this._router.navigate(['./administrador']);
          } else {
            alert('Nombre de usuario o contraseña inválidos');
            this._router.navigate(['./listVirus']);
          }

        }
      },
      error => {
        alert('No se pudo loguear');
      }
    );
  }

}
