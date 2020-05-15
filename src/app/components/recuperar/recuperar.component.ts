import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {

  usuario: string;
  
  constructor(private sidvi: SIDVIServices, private router: Router) {
  }

  ngOnInit() { }

  enviarCorreo() {
    if (this.usuario.length <= 0) {
      return;
    }
    this.sidvi.usuario.recuperacion(this.usuario).subscribe(
      res => {

        Swal.fire({ title: '¡Listo!', text: 'Revisa tu correo para poder reestablecer tu contraseña', icon: 'success', heightAuto: false }).then((result) => {
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
