export type OrderModeEnum = 'ASC' | 'DESC';
export const OrderModeEnum = {
    ASC: 'ASC' as OrderModeEnum,
    DESC: 'DESC' as OrderModeEnum
}

export type EncodingEnum = 'ascii' | 'base64' | 'binary' | 'hex' | 'ucs2' | 'utf8' | 'latin1';
export const EncodingEnum = {
    ASCII: 'ascii' as EncodingEnum,
    BASE64: 'base64' as EncodingEnum,
    BINARY: 'binary' as EncodingEnum,
    HEX: 'hex' as EncodingEnum,
    UCS2: 'ucs2' as EncodingEnum,
    UTF8: 'utf8' as EncodingEnum,
    LATIN1: 'latin1' as EncodingEnum
}

export type ContentTypeEnum = 'application/json' | 'application/pdf' | 'image/png' | 'image/jpeg' | 'video/mp4';
export const ContentTypeEnum = {
    JSON: 'application/json' as ContentTypeEnum,
    PDF: 'application/pdf' as ContentTypeEnum,
    PNG: 'image/png' as ContentTypeEnum,
    JPG: 'image/jpeg' as ContentTypeEnum,
    MP4: 'video/mp4' as ContentTypeEnum,
}
