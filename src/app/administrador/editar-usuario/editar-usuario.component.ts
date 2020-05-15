import { Component, OnInit } from '@angular/core';
import { Usuario, _Usuario } from 'src/models';
import { SIDVIServices } from 'src/api';
import Swal from 'sweetalert2';
import { _APIResponse } from 'src/api/APIResponse';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private sidvi: SIDVIServices) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.sidvi.usuario.listarUsuarios(undefined, undefined, undefined, undefined, _Usuario.Rol.USUARIO).subscribe( usuarios => {
      this.usuarios = usuarios.resultados.map((item: any) => new Usuario(item));
    });
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
