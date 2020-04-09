import { _APIResponse } from './APIResponse';

// Types
export type OrderModeEnum = 'ASC' | 'DESC';
export const OrderModeEnum = {
    ASC: 'ASC' as OrderModeEnum,
    DESC: 'DESC' as OrderModeEnum
};

export type EncodingEnum = 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf8' | 'latin1';
export const EncodingEnum = {
    ASCII: 'ascii' as EncodingEnum,
    BASE64: 'base64' as EncodingEnum,
    BINARY: 'binary' as EncodingEnum,
    HEX: 'hex' as EncodingEnum,
    UCS2: 'ucs2' as EncodingEnum,
    UTF8: 'utf8' as EncodingEnum,
    LATIN1: 'latin1' as EncodingEnum
};

export type ContentTypeEnum = 'application/json' | 'application/pdf' | 'image/png' | 'image/jpeg' | 'video/mp4';
export const ContentTypeEnum = {
    JSON: 'application/json' as ContentTypeEnum,
    PDF: 'application/pdf' as ContentTypeEnum,
    PNG: 'image/png' as ContentTypeEnum,
    JPG: 'image/jpeg' as ContentTypeEnum,
    MP4: 'video/mp4' as ContentTypeEnum,
};

// Defaults
export const Defaults = {
    saltRounds: 2,

    indicePagina: 0,
    tamanoPagina: 100,
    ordenarModo: OrderModeEnum.ASC,

    defaultResponse: _APIResponse.OK,
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
};
