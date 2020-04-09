
// tslint:disable-next-line: no-namespace
export namespace _APIResponse {
    export type TypeEnum = 'ERROR' | 'SUCCESS';
    export const TypeEnum = {
        ERROR: 'ERROR' as TypeEnum,
        SUCCESS: 'SUCCESS' as TypeEnum
    };

    // Default Responses
    export const OK: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 200,
        message: 'La operación se ha realizado correctamente'
    }
    export const ACCEPTED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 202,
        message: 'La operación se ha aceptado y se esta procesando'
    };
    export const CREATED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 201,
        message: 'El recurso se ha creado correctamente'
    }
    export const UPDATED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 201,
        message: 'El recurso se ha actualizado correctamente'
    }
    export const DELETED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 204,
        message: 'El recurso se ha eliminado correctamente'
    }

    export const NO_CONTENT: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 204,
        message: 'La operación se ha realizado correctamente'
    };
    export const BAD_REQUEST: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 400,
        message: 'No podemos procesar los datos, por favor revise los datos enviados'
    };
    export const UNAUTHORIZED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 401,
        message: 'No esta autorizado para utilizar el sistema'
    };
    export const FORBIDDEN: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 403,
        message: 'No cuenta con los privilegios para realizar esta operación',
    };
    export const NOT_FOUND: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 404,
        message: 'El recurso solicitado no se encontró'
    };
    export const ALREADY_EXISTS: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 409,
        message: 'El recurso ya existe'
    };
    export const PRECONDITION_FAILED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 412,
        message: 'No es posible realizar esta operación en este momento'
    };
    export const UNPROCESSABLE_ENTITY: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 422,
        message: 'No se puede realizar la operación'
    };
    export const RESOURCE_EXHAUSTED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 409,
        message: 'El recurso se ha agotado'
    };
    export const UNHANDLED_ERROR: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 500,
        message: 'Ocurrió un problema, intente de nuevo más tarde'
    };
    export const NOT_IMPLEMENTED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 501,
        message: 'Ocurrió un problema, intente de nuevo más tarde'
    };
    export const UNAVAILABLE: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 501,
        message: 'El servicio no esta disponible, intente de nuevo más tarde'
    };
}

// Interface APIResponse
export interface IAPIResponse {
    type: _APIResponse.TypeEnum;
    statusCode: number;
    message: string;
    extra?: any;
    debugMessage?: any;
}

export class APIResponse implements IAPIResponse {
    type: _APIResponse.TypeEnum;
    statusCode: number;
    message: string;
    extra?: any;
    debugMessage?: any;

    constructor(apiResponse: APIResponse) {
        if (apiResponse != null) {
            this.type = apiResponse.type;
            this.statusCode = apiResponse.statusCode;
            this.message = apiResponse.message;
            this.extra = apiResponse.extra;
            this.debugMessage = apiResponse.debugMessage;
        }
    }

}