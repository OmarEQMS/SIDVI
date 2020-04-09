import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico } from './Medico';
import { Virus } from './Virus';

export namespace _MedicoVirus {

}

export interface IMedicoVirus {
    idMedicoVirus?: number;
    fkMedico?: number;
    fkVirus?: number;
}

export class MedicoVirus implements IMedicoVirus {

    // Columns
    idMedicoVirus?: number;
    fkMedico?: number;
    fkVirus?: number;

    //Relations: BelongsToOne
    medico?: Medico;
    virus?: Virus;
    // Relations: HasMany

    // Constructor
    constructor(medicoVirus?: any) {
        if (medicoVirus !== undefined) {
            this.idMedicoVirus = medicoVirus.idMedicoVirus;
            this.fkMedico = medicoVirus.fkMedico;
            this.fkVirus = medicoVirus.fkVirus;
        }
    }
}
