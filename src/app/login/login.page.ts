import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router) {
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

    /*this._usuarioService.autenticacion(usuario, password).subscribe(
      res => {
        if (res) {
          console.log(res);

          // Redirigir al usuario a una página en blanco
          this._router.navigate(['/administrador']);
        }
      },
      error => {
        alert('No se pudo loguear');

        // TODO: Redirigir al usuario a la página principal?
      }
    );*/
  }

}
