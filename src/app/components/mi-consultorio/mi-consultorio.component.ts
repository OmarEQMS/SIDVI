import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIDVIServices } from 'src/api';
import { Router } from '@angular/router';
import {Medico} from '../../../models/Medico';
@Component({
  selector: 'app-mi-consultorio',
  templateUrl: './mi-consultorio.component.html',
  styleUrls: ['./mi-consultorio.component.scss'],
})
export class MiConsultorioComponent implements OnInit {
  consultorioForm: FormGroup;
  hayErrores: boolean;

  constructor(private _SIDVI: SIDVIServices, private _router: Router)
  { 
    this.hayErrores=false;
    this.consultorioForm = new FormGroup({
      nombre:     new FormControl('', Validators.required),
      cedula:     new FormControl('', Validators.required),
      telefono:   new FormControl('', Validators.required),
      direccion:  new FormControl('', Validators.required),
      descripcion:new FormControl('', Validators.required),
      imagen:     new FormControl(),
    });
  }
  ngOnInit() {}

  registrar()
  {
    console.log("registrar " + this.consultorioForm.status );
    if  (this.consultorioForm.status ==  "VALID"){
      this.hayErrores = false;  
    }else if  (this.consultorioForm.status ==  "INVALID"){
      this.hayErrores = true; 
    }
  }
}
