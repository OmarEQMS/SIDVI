import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario, _Usuario } from 'src/models';
import { SIDVIServices, Defaults } from 'src/api';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalContainerComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {

  @ViewChild('basicModal', { static: true }) basicModal: ModalContainerComponent;
  usuarios: Usuario[];
  usuarioModal: Usuario = new Usuario();
  editar: boolean;
  contrasena: string;
  validacionUsuario: boolean;
  validacionContrasena: boolean;

  constructor(private sidvi: SIDVIServices, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.sidvi.usuario.listarUsuarios(undefined, undefined, undefined, undefined, _Usuario.Rol.USUARIO).subscribe(usuarios => {
      this.usuarios = usuarios.resultados.map((item: any) => new Usuario(item));

      for (const administrador of this.usuarios) {
        // Obtener imagen
        if (Defaults.allowBase64Types.includes(this.usuarioModal.mimetypeFoto)) {
          this.usuarioModal.archivoIconoImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.usuarioModal.archivoFoto as string);
        }
      }
    });
  }

  detallesModal(usuario?: Usuario) {
    if (usuario != null) {
      this.usuarioModal = new Usuario(usuario);
      this.editar = true;
    } else {
      this.usuarioModal = new Usuario();
      this.usuarioModal.rol = _Usuario.Rol.USUARIO;
      this.editar = false;
      this.contrasena = '';
    }
  }

  handleFileInput(files: FileList) {
    if (files[0] != null) {
      this.usuarioModal.localFile = files;
      this.usuarioModal.localFileName = files[0].name;
    }
  }

  editarUsuario() {

    if (this.usuarioModal.nombreCompleto === '' || this.usuarioModal.nombreCompleto == null ||
      this.usuarioModal.usuario === '' || this.usuarioModal.usuario == null ||
      this.usuarioModal.correo === '' || this.usuarioModal.correo == null ||
      this.usuarioModal.celular === '' || this.usuarioModal.celular == null) {
      this.validacionUsuario = true;
      return;
    }
    this.validacionUsuario = false;
    this.basicModal.hide();

    delete this.usuarioModal.archivoFoto;
    delete this.usuarioModal.mimetypeFoto;

    this.sidvi.usuario.actualizarUsuario(this.usuarioModal.idUsuario, this.usuarioModal).subscribe(
      res => {
        // Checar si se subió un doc
        if (this.usuarioModal.localFile != null) {
          this.actualizarUsuarioImagen('actualizado');
          return;
        }

        Swal.fire({ title: '¡Listo!', text: 'Usuario actualizado correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarUsuarios();
          }
        });
      },
      error => console.error(error)
    );
  }

  guardarUsuario() {
    delete this.usuarioModal.archivoFoto;
    delete this.usuarioModal.mimetypeFoto;


    if (this.usuarioModal.contrasena !== this.contrasena) {
      this.validacionContrasena = true;
      return;
    }
    this.validacionContrasena = false;

    if (this.usuarioModal.nombreCompleto === '' || this.usuarioModal.nombreCompleto == null ||
      this.usuarioModal.usuario === '' || this.usuarioModal.usuario == null ||
      this.usuarioModal.correo === '' || this.usuarioModal.correo == null ||
      this.usuarioModal.celular === '' || this.usuarioModal.celular == null ||
      this.usuarioModal.contrasena === '' || this.usuarioModal.contrasena == null) {
      this.validacionUsuario = true;
      return;
    }
    this.validacionUsuario = false;
    this.basicModal.hide();

    this.sidvi.usuario.crearUsuario(this.usuarioModal).subscribe(
      res => {
        this.usuarioModal.idUsuario = res.extra.insertedId;

        // Checar si se subió un doc
        if (this.usuarioModal.localFile != null) {
          this.actualizarUsuarioImagen('creado');
          return;
        }

        Swal.fire({ title: '¡Listo!', text: 'Usuario creado correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarUsuarios();
          }
        });
      },
      error => console.error(error)
    );
  }

  actualizarUsuarioImagen(verbo: string) {
    this.sidvi.usuario.cargarUsuarioFoto(this.usuarioModal.idUsuario, this.usuarioModal.localFile[0]).subscribe(
      res => {
        Swal.fire({ title: '¡Listo!', text: 'Usuario ' + verbo + ' correctamente', icon: 'success', heightAuto: false }).then((result) => {
          if (result.value) {
            this.listarUsuarios();
          }
        });
      },
      error => {
        alert('Los archivos no se pudieron actualizar');
      }
    );
  }

  recuperarContrasena() {
    this.sidvi.usuario.recuperacion(this.usuarioModal.usuario).subscribe(
      res => {
        this.validacionUsuario = false;
        this.basicModal.hide();
        Swal.fire({ title: '¡Listo!', text: 'Revisa el correo para poder reestablecer tu contraseña', icon: 'success', heightAuto: false });
      },
      error => {
        console.error(error);
      }
    );
  }

  eliminar(usuario: Usuario) {
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

        if (this.usuarios.length === 1) {
          Swal.fire('Error', 'Debe haber mínimo un usuario en el sistema', 'error');
          return;
        }

        this.sidvi.usuario.eliminarUsuario(usuario.idUsuario).subscribe(
          res => {
            if (res.type === _APIResponse.TypeEnum.SUCCESS) {
              Swal.fire({
                title: 'Borrado completo',
                text: 'El bloque de información ha sido eliminado exitosamente',
                icon: 'success',
                heightAuto: false
              }).then((results) => {
                this.listarUsuarios();
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
