export * from './API';
export * from './Manager.Service';
export * from './CategoriaEstadistica.Service';
export * from './CategoriaInformacion.Service';
export * from './SubcategoriaEstadistica.Service';
export * from './Estadistica.Service';
export * from './Informacion.Service';
export * from './Medico.Service';
export * from './MedicoVirus.Service';
export * from './TestNodo.Service';
export * from './TestOpcion.Service';
export * from './Ubicacion.Service';
export * from './Usuario.Service';
export * from './Valoracion.Service';
export * from './Virus.Service';

import { Injectable } from '@angular/core';
import * as API from './API';
import * as Tools from './Tools';
import { ManagerService } from './Manager.Service';
import { CategoriaEstadisticaService } from './CategoriaEstadistica.Service';
import { CategoriaInformacionService } from './CategoriaInformacion.Service';
import { SubcategoriaEstadisticaService } from './SubcategoriaEstadistica.Service';

import { EstadisticaService } from './Estadistica.Service';
import { InformacionService } from './Informacion.Service';
import { MedicoService } from './Medico.Service';
import { MedicoVirusService } from './MedicoVirus.Service';
import { TestNodoService } from './TestNodo.Service';
import { TestOpcionService } from './TestOpcion.Service';
import { UbicacionService } from './Ubicacion.Service';
import { UsuarioService } from './Usuario.Service';
import { ValoracionService } from './Valoracion.Service';
import { VirusService } from './Virus.Service';

@Injectable()
export class SIDVIServices {
    public API = API;
    public Tools = Tools;

    constructor(
        public manager: ManagerService,
        public categoriaEstadistica: CategoriaEstadisticaService,
        public categoriaInformacion: CategoriaInformacionService,
        public subcategoriaEstadisticaService: SubcategoriaEstadisticaService,
        public estadistica: EstadisticaService,
        public informacion: InformacionService,
        public medico: MedicoService,
        public medicoVirus: MedicoVirusService,
        public testNodo: TestNodoService,
        public testOpcion: TestOpcionService,
        public ubicacion: UbicacionService,
        public usuario: UsuarioService,
        public valoracion: ValoracionService,
        public virus: VirusService,
    ) { }

}
