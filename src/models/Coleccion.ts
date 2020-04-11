
export interface IColeccion <Type> {
    resultados: Type[];
    total: number;
}
export class Coleccion <Type> implements IColeccion<Type> {
    resultados: Type[];
    total: number;

    constructor(results: Type[], total: number) {
        this.resultados = results;
        this.total = total;
    }
}
