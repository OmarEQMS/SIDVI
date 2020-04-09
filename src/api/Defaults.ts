import { _APIResponse } from '../responses'

import { OrderModeEnum, EncodingEnum, ContentTypeEnum } from './Enums';

export const Defaults = {
    saltRounds: 2,

    indicePagina: 0,
    tamanoPagina: 100,
    ordenarModo: OrderModeEnum.ASC,

    DefaultResponse: _APIResponse.OK,
    encoding: EncodingEnum.UTF8,
    contentType: ContentTypeEnum.JSON,
    allowBase64Types: [ContentTypeEnum.JPG, ContentTypeEnum.PNG],

    timezone: 'America/Mexico_City',
    dateformat: 'YYYY-MM-DD',
    timeformat: 'YYYY-MM-DD HH:mm:ss',

    codeAlphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    codeLength: 100,
    
    anyUser: 'ANY',
    pathUser: 'PATH'
}