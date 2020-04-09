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
    
    // Respond Object
    toJSON() {
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...MedicoVirus.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  
        Medico: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Medico',
            join: { from: 'MedicoVirus.fkMedico', to: 'Medico.idMedico' }
        },
        Virus: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Virus',
            join: { from: 'MedicoVirus.fkVirus', to: 'Virus.idVirus' }
        }
        //------------------------------------- HasOneThroughRelation
    };

}
