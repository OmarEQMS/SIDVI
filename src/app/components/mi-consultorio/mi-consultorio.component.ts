import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import {Medico} from '../../../models/Medico';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Ubicacion } from 'src/models';
@Component({
  selector: 'app-mi-consultorio',
  templateUrl: './mi-consultorio.component.html',
  styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
  consultorioForm: FormGroup; 
  hayErrores: boolean;    crearConsultorio: boolean=true;
  localIcono: IconDefinition;
  consultoriosList: Medico[]; consultorio: Medico;
  paises: Ubicacion[] = []; municipios: Ubicacion[] = []; ciudades: Ubicacion[] = [];
  icons: { [id: string]: IconDefinition } = {
    plus: faChevronRight,
    minus: faChevronDown,
    guion: faMinus
  };

  constructor(private _SIDVI: SIDVIServices, private _router: Router)
  { 
    this.hayErrores=false;
    this.localIcono = this.icons.guion;
    this.consultorio = new Medico();
    this.consultorioForm = new FormGroup({
      nombreDr:         new FormControl('', Validators.required),   cedula:    new FormControl('', Validators.required),
      nombreConsultorio:new FormControl('', Validators.required),   telefono:  new FormControl('', Validators.required),   
      direccion:        new FormControl('', Validators.required),   ubicacion: new FormControl('', Validators.required),
      descripcion:new FormControl('', Validators.required),         imagen:    new FormControl(),
    });
  }

  ngOnInit() 
  {
    //TODO: checar si hay sesion iniciada, sino mandar a pagina de inicio
    this._SIDVI.medico.listarMedicos(this._SIDVI.manager.usuario.idUsuario, null, null, null, null, null, null, null,null)
        .subscribe(res => {
          this.consultoriosList= res.resultados; 
        }, err =>{ console.log(err); });
    this.obtenerPaises();

  }

  obtenerPaises(){
    this.municipios = []; this.ciudades = [];
    this._SIDVI.ubicacion.listarUbicaciones(null, null, null, null, null)
          .subscribe(res => {
            res.resultados.forEach(el => {
              if (!el.fkUbicacion) {this.paises.push(el); }
            });
          });
  }

  obtenerMunicipios(paisId: number){
    this.municipios = []; this.ciudades = [];
    this._SIDVI.ubicacion.listarUbicaciones(paisId, null, null, null, null)
    .subscribe(res => {
      res.resultados.forEach(el => {
        if (el.fkUbicacion == paisId) {this.municipios.push(el);  }
      });
    });
  }

  obtenerCiudades(municipioId: number){
    this._SIDVI.ubicacion.listarUbicaciones(municipioId, null, null, null, null)
    .subscribe(res => {
      res.resultados.forEach(el => {
        if (el.fkUbicacion == municipioId) {this.ciudades.push(el);  }
      });
    });
  }

  registrar()
  {
    console.log("registrar " + this.consultorioForm.status );
    if  (this.consultorioForm.status ==  "VALID"){
      console.log( this.consultorioForm.value.ubicacion);
      this.hayErrores = false; 
      this.consultorio.fkUsuario         = this._SIDVI.manager.usuario.idUsuario;
      this.consultorio.fkUbicacion       = this.consultorioForm.value.ubicacion;
      this.consultorio.nombreConsultorio = this.consultorioForm.value.nombreConsultorio;
      this.consultorio.nombreDoctor      = this.consultorioForm.value.nombreDr;
      this.consultorio.direccionConsultorio= this.consultorioForm.value.direccion;
      this.consultorio.telefonoConsultorio= this.consultorioForm.value.telefono;
      this.consultorio.cedulaProfesional = this.consultorioForm.value.cedula;
      this.consultorio.descripcion       = this.consultorioForm.value.descripcion;
      this.consultorio.mimetypeFoto      = null; //NO SEEE :(
      if(this.consultorioForm.value.image == null){   //no seeee :(
        this.consultorio.archivoFoto = 'null'; console.log("parte 1")
      }else{
        this.consultorio.archivoFoto = 'NULL'; console.log("part 2");//this.consultorioForm.value.imagen;
      }
      this._SIDVI.medico.crearMedico(this.consultorio)
          .subscribe(res => {
            console.log("res");
            console.log(res);
          }, err => {console.log(err)});
    }else if  (this.consultorioForm.status ==  "INVALID"){
      this.hayErrores = true; 
    }
  }

  verConsultorio(con: Medico){
    this.crearConsultorio = false;
    if (this.consultorio != con){
      this.consultorio = con;
    }
  }

  crearConsultorioF(){
    if(this.crearConsultorio==false){
      this.crearConsultorio = true;
      this.consultorio= new Medico();
    }
  }
}
