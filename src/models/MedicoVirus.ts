import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico} from './Medico';
import { Virus} from './Virus';



export namespace _MedicoVirus {
    
}

export interface IMedicoVirus {
    idMedicoVirus?: number;
    fkMedico?: number;
    fkVirus?: number;
}

export class MedicoVirus extends BaseModel implements IMedicoVirus {
    // Objection
    static tableName = 'MedicoVirus';
    static idColumn = 'idMedicoVirus';
    // Objection Modifiers
    static columnList = ['idMedicoVirus', 'fkMedico', 'fkVirus'];

    // Columns
    idMedicoVirus?: number;
    fkMedico?: number;
    fkVirus?: number;

    //Relations: BelongsToOne
    medico?: Medico;
    virus?: Virus;
    // Relations: HasMany

    // Constructor
    constructor(medicoVirus?: any){
        super();
        if(medicoVirus!==undefined){
            this.idMedicoVirus = medicoVirus.idMedicoVirus;
            this.fkMedico = medicoVirus.fkMedico;
            this.fkVirus = medicoVirus.fkVirus;
        }
    }
}
