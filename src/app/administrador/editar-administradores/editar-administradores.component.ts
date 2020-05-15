import { Component, OnInit, ViewChild } from '@angular/core';
import { SIDVIServices, Defaults } from 'src/api';
import { _Usuario, Usuario } from 'src/models';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalContainerComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-editar-administradores',
  templateUrl: './editar-administradores.component.html',
  styleUrls: ['./editar-administradores.component.scss'],
})
export class EditarAdministradoresComponent implements OnInit {

  @ViewChild('basicModal', { static: true }) basicModal: ModalContainerComponent;
  administradores: Usuario[];
  administradorModal: Usuario = new Usuario();
  editar: boolean;
  contrasena: string;
  validacionAdmin: boolean;
  validacionContrasena: boolean;
  idUsuario: number;

  constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) {
    this.idUsuario = this.sidvi.manager.usuario.idUsuario;
    this.administradores = new Array();
  }

  ngOnInit() {
    this.listarAdministradores();
  }

  listarAdministradores() {
    this.sidvi.usuario.listarUsuarios(undefined, undefined, undefined, undefined, _Usuario.Rol.ADMINISTRADOR).subscribe(administradores => {
      for (const admin of administradores.resultados) {
        if (admin.idUsuario !== this.idUsuario) {
          this.administradores.push(new Usuario(admin));
        }
      }

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

    if (this.administradorModal.nombreCompleto === '' || this.administradorModal.nombreCompleto == null ||
      this.administradorModal.usuario === '' || this.administradorModal.usuario == null ||
      this.administradorModal.correo === '' || this.administradorModal.correo == null ||
      this.administradorModal.celular === '' || this.administradorModal.celular == null) {
      this.validacionAdmin = true;
      return;
    }
    this.validacionAdmin = false;
    this.basicModal.hide();

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
      this.validacionContrasena = true;
      return;
    }
    this.validacionContrasena = false;

    if (this.administradorModal.nombreCompleto === '' || this.administradorModal.nombreCompleto == null ||
      this.administradorModal.usuario === '' || this.administradorModal.usuario == null ||
      this.administradorModal.correo === '' || this.administradorModal.correo == null ||
      this.administradorModal.celular === '' || this.administradorModal.celular == null ||
      this.administradorModal.contrasena === '' || this.administradorModal.contrasena == null) {
      this.validacionAdmin = true;
      return;
    }
    this.validacionAdmin = false;
    this.basicModal.hide();

    this.sidvi.usuario.crearUsuario(this.administradorModal).subscribe(
      res => {
        this.administradorModal.idUsuario = res.extra.insertedId;

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

  recuperarContrasena() {
    this.sidvi.usuario.recuperacion(this.administradorModal.usuario).subscribe(
      res => {
        this.validacionAdmin = false;
        this.basicModal.hide();
        Swal.fire({ title: '¡Listo!', text: 'Revisa el correo para poder reestablecer tu contraseña', icon: 'success', heightAuto: false });
      },
      error => {
        console.error(error);
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
