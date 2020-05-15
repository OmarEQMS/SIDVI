import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.scss'],
})
export class RestablecerComponent implements OnInit {

  usuario: string;
  token: string;
  contrasena: string;
  contrasenaCopy: string;
  coinciden: boolean;

  constructor(private sidvi: SIDVIServices, private activatedRoute: ActivatedRoute, private router: Router) {
    this.contrasena = '';
    this.contrasenaCopy = '';
    this.coinciden = true;
   }

  ngOnInit() { }

  ionViewWillEnter() {
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  restablecer() {

    // Validar que las contraseñas coincidan
    if (this.contrasena !== this.contrasenaCopy || this.contrasena === '') {
        this.coinciden = false;
        return;
    }

    this.sidvi.usuario.restablecer(this.token, this.usuario, this.contrasena).subscribe(
      res => {
        console.log(res);
        Swal.fire({ title: '¡Listo!', text: 'Tu contraseña ha sido restablecida con éxito.', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.router.navigate(['./login']);
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  }

}
