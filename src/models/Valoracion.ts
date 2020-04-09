import { RelationMappings, Model, val } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
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

export class Valoracion extends BaseModel implements IValoracion {
    // Objection
    static tableName = 'Valoracion';
    static idColumn = 'idValoracion';
    // Objection Modifiers
    static columnList = ['idValoracion', 'fkMedicoVirus', 'fkUsuario', 'valoracion'];

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
    constructor(valoracion?: any){
        super();
        if(valoracion!==undefined){
            this.idValoracion = valoracion.idValoracion;
            this.fkMedicoVirus = valoracion.fkMedicoVirus;
            this.fkUsuario = valoracion.fkUsuario;
            this.valoracion = valoracion.valoracion;
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
                builder.select(...Valoracion.columnList);
            }
        };
    }


    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  
        MedicoVirus: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'MedicoVirus',
            join: { from: 'Valoracion.fkMedicoVirus', to: 'MedicoVirus.idMedicoVirus' }
        },
        Usuario: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Usuario',
            join: { from: 'Valoracion.fkUsuario', to: 'Usuario.idUsuario' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
