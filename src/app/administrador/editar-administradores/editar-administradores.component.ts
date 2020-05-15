import { Component, OnInit } from '@angular/core';
import { SIDVIServices } from 'src/api';
import { _Usuario, Usuario } from 'src/models';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-administradores',
  templateUrl: './editar-administradores.component.html',
  styleUrls: ['./editar-administradores.component.scss'],
})
export class EditarAdministradoresComponent implements OnInit {

  administradores: Usuario[];
  administradorModal: Usuario = new Usuario();

  constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.listarAdministradores();
  }

  listarAdministradores() {
    this.sidvi.usuario.listarUsuarios(undefined, undefined, undefined, undefined, _Usuario.Rol.ADMINISTRADOR).subscribe(administradores => {
      this.administradores = administradores.resultados.map((item: any) => new Usuario(item));
    });
  }

  detallesModal(administrador: Usuario) {
    this.administradorModal = administrador;

    // Obtener imagen
    if (this.administradorModal.archivoFoto != null) {
      this.administradorModal.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.administradorModal.archivoFoto as string);
    }
  }

  eliminar(administrador: Usuario) {
    // Mostrar mensaje de confirmación
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro que quieres eliminar esta información?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.value) {

        if (this.administradores.length === 1) {
          Swal.fire('Error', 'Debe haber mínimo un administrador en el sistema', 'error');
          return;
        }

        this.sidvi.usuario.eliminarUsuario(administrador.idUsuario).subscribe(
          res => {
            if (res.type === _APIResponse.TypeEnum.SUCCESS) {
              Swal.fire({
                title: 'Borrado completo',
                text: 'El bloque de información ha sido eliminado exitosamente',
                icon: 'success',
                heightAuto: false
              }).then((results) => {
                this.listarAdministradores();
              });
            }
          },
          error => {
            alert('No se pudo eliminar');
          }
        );
      }
    });
  }

}
