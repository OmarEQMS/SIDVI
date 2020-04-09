import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico } from './Medico';
import { Usuario } from './Usuario';
import { MedicoVirus } from './MedicoVirus';

export namespace _Valoracion {

}

export interface IValoracion {
    idValoracion?: number;
    fkMedico?: number;
    fkUsuario?: number;
    valoracion?: number;
}

export class Valoracion implements IValoracion {

    // Columns
    idValoracion?: number;
    fkMedicoVirus?: number;
    fkUsuario?: number;
    valoracion?: number;

    //Relations: BelongsToOne
    medicoVirus?: MedicoVirus;
    usuario?: Usuario;

    // Relations: HasMany

    // Constructor
    constructor(valoracion?: any) {
        if (valoracion !== undefined) {
            this.idValoracion = valoracion.idValoracion;
            this.fkMedicoVirus = valoracion.fkMedicoVirus;
            this.fkUsuario = valoracion.fkUsuario;
            this.valoracion = valoracion.valoracion;
        }
    }

    //ToObjectDB
    toObjectDB(){
        return {
            idValoracion: this.idValoracion,
            fkMedicoVirus: this.fkMedicoVirus,
            fkUsuario: this.fkUsuario,
            valoracion: this.valoracion
        }
    }
}
