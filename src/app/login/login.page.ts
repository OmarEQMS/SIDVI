import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, SIDVIServices } from 'src/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
          console.log(res);

          // TODO: Checar si es admin o no y redirigir al usuario
          this._router.navigate(['/administrador']);
        }
      },
      error => {
        alert('No se pudo loguear');
      }
    );
  }

}
