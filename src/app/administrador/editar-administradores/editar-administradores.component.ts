import { Component, OnInit } from '@angular/core';
import { SIDVIServices, Defaults } from 'src/api';
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
  editar: boolean;
  contrasena: string;

  constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.listarAdministradores();
  }

  listarAdministradores() {
    this.sidvi.usuario.listarUsuarios(undefined, undefined, undefined, undefined, _Usuario.Rol.ADMINISTRADOR).subscribe(administradores => {
      this.administradores = administradores.resultados.map((item: any) => new Usuario(item));

      for (const administrador of this.administradores) {
        // Obtener imagen
        if (Defaults.allowBase64Types.includes(this.administradorModal.mimetypeFoto)) {
          this.administradorModal.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.administradorModal.archivoFoto as string);
        }
      }
    });
  }

  detallesModal(administrador?: Usuario) {
    if (administrador != null) {
      this.administradorModal = new Usuario(administrador);
      this.editar = true;
    } else {
      this.administradorModal = new Usuario();
      this.administradorModal.rol = _Usuario.Rol.ADMINISTRADOR;
      this.editar = false;
      this.contrasena = '';
    }
  }

  handleFileInput(files: FileList) {
    if (files[0] != null) {
      this.administradorModal.localFile = files;
      this.administradorModal.localFileName = files[0].name;
    }
  }

  editarAdmin() {
    console.log(this.administradorModal);
    delete this.administradorModal.archivoFoto;
    delete this.administradorModal.mimetypeFoto;

    this.sidvi.usuario.actualizarUsuario(this.administradorModal.idUsuario, this.administradorModal).subscribe(
      res => {
        // Checar si se subió un doc
        if (this.administradorModal.localFile != null) {
          this.actualizarUsuarioImagen('actualizado');
          return;
        }

        Swal.fire({ title: '¡Listo!', text: 'Administrador actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarAdministradores();
          }
        });
      },
      error => console.error(error)
    );
  }

  guardarAdmin() {
    delete this.administradorModal.archivoFoto;
    delete this.administradorModal.mimetypeFoto;

    if (this.administradorModal.contrasena !== this.contrasena) {
      console.error('Las contraseñas no coinciden');
    }

    this.sidvi.usuario.crearUsuario(this.administradorModal).subscribe(
      res => {
        this.administradorModal.idUsuario = res.idUsuario;

        // Checar si se subió un doc
        if (this.administradorModal.localFile != null) {
          this.actualizarUsuarioImagen('creado');
          return;
        }

        Swal.fire({ title: '¡Listo!', text: 'Administrador creado correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarAdministradores();
          }
        });
      },
      error => console.error(error)
      );
  }

  actualizarUsuarioImagen(verbo: string) {
    this.sidvi.usuario.cargarUsuarioFoto(this.administradorModal.idUsuario, this.administradorModal.localFile[0]).subscribe(
      res => {
        Swal.fire({ title: '¡Listo!', text: 'Administrador ' + verbo + ' correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarAdministradores();
          }
        });
      },
      error => {
        alert('Los archivos no se pudieron actualizar');
      }
    );
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
