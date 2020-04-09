import { ContentTypeEnum, Defaults } from '../api/API';

import { Medico } from './Medico';
import { Virus } from './Virus';

// tslint:disable-next-line:no-namespace
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

    // Relations: BelongsToOne
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

    // ToObjectDB
    toObjectDB() {
        return {
            idMedicoVirus: this.idMedicoVirus,
            fkMedico: this.fkMedico,
            fkVirus: this.fkVirus
        };
    }
}
