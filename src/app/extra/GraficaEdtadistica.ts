import { Ubicacion, CategoriaEstadistica, SubcategoriaEstadistica, Estadistica, _Estadistica, IUbicacion } from 'src/models';
import { SIDVIServices, OrderModeEnum } from 'src/api';
import Swal from 'sweetalert2';

class EstadisticaValue {
    total: number;
    seleccionados: number;

    constructor(total: number, seleccionados: number) {
        this.total = total;
        this.seleccionados = seleccionados;
    }
}

export class GraficaEdtadistica {
    // Settings
    ubicacion: Ubicacion;
    idCategoriaSelected: string;
    idSubcategoriaSelected: string;
    idCategoriaSelectedGrupo: string;
    idSubcategoriaSelectedGrupo: string;
    categoriaSelected: CategoriaEstadistica;
    subcategoriaSelected: SubcategoriaEstadistica;
    categoriaSelectedGrupo: CategoriaEstadistica;
    subcategoriaSelectedGrupo: SubcategoriaEstadistica;
    subcategoriaEjeHorizontal: number;
    agrupacionOpcion: number;
    tipoGrafica: string;
    idVirus: number;

    // Data
    categoriaEstadistica: CategoriaEstadistica;

    // Grafica
    identificador: number;
    nombre: string;
    localChartType = 'bar';
    localChartDatasets: Array<any> = [{ data: [], label: '' }];
    localChartLabels: Array<string> = [];
    localChartColors: Array<any> = [{
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
    }];
    localChartOptions: any = { responsive: true, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } };

    constructor(idVirus: number, identificador: number) {
        this.categoriaSelectedGrupo = new CategoriaEstadistica({idCategoriaEstadistica: -1});
        this.categoriaSelected = new CategoriaEstadistica({idCategoriaEstadistica: -1});
        this.subcategoriaSelected = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.subcategoriaSelectedGrupo = new SubcategoriaEstadistica({idSubcategoriaEstadistica: -1});
        this.idCategoriaSelected = '-1';
        this.idCategoriaSelectedGrupo = '-1';
        this.idCategoriaSelectedGrupo = '-1';
        this.idSubcategoriaSelectedGrupo = '-1';

        this.subcategoriaEjeHorizontal = 1;
        this.agrupacionOpcion = 1;
        this.tipoGrafica = '-1';
        this.idVirus = idVirus;
        this.identificador = identificador;
    }

    filtrarEstadisticas(sidvi: SIDVIServices) {
        let fkSubcategoriaEstadistica1 = this.subcategoriaSelected.idSubcategoriaEstadistica;
        let fkSubcategoriaEstadistica2 = this.subcategoriaSelectedGrupo.idSubcategoriaEstadistica;
        let fkCategoriaEstadistica1 = this.categoriaSelected.idCategoriaEstadistica;
        let fkCategoriaEstadistica2 = this.categoriaSelectedGrupo.idCategoriaEstadistica;
        this.nombre = '';

        if (this.tipoGrafica === '-1') {
            Swal.fire({title: 'Tipo de Grafica invalido', icon: 'error', backdrop: false});
            return;
        }
        switch (this.subcategoriaEjeHorizontal) {
            case 1: { // Subcategoria
                if (fkCategoriaEstadistica1 === -1) {
                    Swal.fire({title: 'Categoria invalida', icon: 'error', backdrop: false});
                    return;
                }
                fkSubcategoriaEstadistica1 = null;
                this.nombre += this.categoriaSelected.nombre + ' distribuida por Subcategoria';
                break;
            }
            case 2: { // Tiempo
                if (fkSubcategoriaEstadistica1 === -1) {
                    Swal.fire({title: 'Subcategoria invalida', icon: 'error', backdrop: false});
                    return;
                }
                fkCategoriaEstadistica1 = null;
                this.nombre += this.subcategoriaSelected.nombre + ' distribuida por Tiempo';
                break;
            }
            case 3: { // Ubicacion
                if (fkSubcategoriaEstadistica1 === -1) {
                    Swal.fire({title: 'Subcategoria invalida', icon: 'error', backdrop: false});
                    return;
                }
                this.ubicacionOnlyOne(this.ubicacion, false, false, true);
                fkCategoriaEstadistica1 = null;
                this.nombre += this.subcategoriaSelected.nombre + ' distribuida por Ubicacion';
                break;
            }
            case 4: { // Mapa
                if (fkSubcategoriaEstadistica1 === -1) {
                    Swal.fire({title: 'Subcategoria invalida', icon: 'error', backdrop: false});
                    return;
                }
                this.ubicacionOnlyOne(this.ubicacion, false, false, true);
                fkCategoriaEstadistica1 = null;
                this.nombre += this.subcategoriaSelected.nombre + ' distribuida por Mapa';
                break;
            }
        }
        switch (this.agrupacionOpcion) {
            case 1: { // No agrupar y sin filtro
                fkCategoriaEstadistica2 = null;
                fkSubcategoriaEstadistica2 = null;
                this.nombre += '';
                break;
            }
            case 2: { // Agrupar por categoria
                if (fkCategoriaEstadistica2 === -1) {
                    Swal.fire({title: 'Categoria invalida', icon: 'error', backdrop: false});
                    fkSubcategoriaEstadistica2 = null;
                    return;
                }
                this.nombre += ' agrupada por ' + this.categoriaSelectedGrupo.nombre;
                break;
            }
            case 3: { // Añadir filtro
                if (fkSubcategoriaEstadistica2 === -1) {
                    Swal.fire({title: 'Subcategoria invalida', icon: 'error', backdrop: false});
                    return;
                }
                fkCategoriaEstadistica2 = null;
                this.nombre += ' filtrada por ' + this.subcategoriaSelectedGrupo.nombre;
                break;
            }
        }

        switch (this.subcategoriaEjeHorizontal) {
            case 1: { // Subcategoria
                this.categoriaEstadistica = new CategoriaEstadistica(this.categoriaSelected);
                break;
            }
            case 2: { // Tiempo
                this.categoriaEstadistica = new CategoriaEstadistica({idCategoriaEstadistica: this.categoriaSelected.idCategoriaEstadistica, nombre: this.categoriaSelected.nombre});
                this.categoriaEstadistica.subcategoriaEstadisticas.push(new SubcategoriaEstadistica({idSubcategoriaEstadistica: this.subcategoriaSelected.idSubcategoriaEstadistica, nombre: this.subcategoriaSelected.nombre}));
                break;
            }
            case 3: { // Ubicacion
                this.categoriaEstadistica = new CategoriaEstadistica({idCategoriaEstadistica: this.categoriaSelected.idCategoriaEstadistica, nombre: this.categoriaSelected.nombre});
                this.categoriaEstadistica.subcategoriaEstadisticas.push(new SubcategoriaEstadistica({idSubcategoriaEstadistica: this.subcategoriaSelected.idSubcategoriaEstadistica, nombre: this.subcategoriaSelected.nombre}));
                break;
            }
            case 4: { // Mapa
                this.categoriaEstadistica = new CategoriaEstadistica({idCategoriaEstadistica: this.categoriaSelected.idCategoriaEstadistica, nombre: this.categoriaSelected.nombre});
                this.categoriaEstadistica.subcategoriaEstadisticas.push(new SubcategoriaEstadistica({idSubcategoriaEstadistica: this.subcategoriaSelected.idSubcategoriaEstadistica, nombre: this.subcategoriaSelected.nombre}));
                break;
            }
        }
        switch (this.agrupacionOpcion) {
            case 1: { // No agrupar y sin filtro
                
                break;
            }
            case 2: { // Agrupar por categoria
                
                break;
            }
            case 3: { // Añadir filtro
                
                break;
            }
        }

        sidvi.estadistica.listarEstadisticas(this.idVirus, null, fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2, fkCategoriaEstadistica1, fkCategoriaEstadistica2, null, null, 'fecha', OrderModeEnum.ASC).subscribe(
            estadis => {

        });
    }

    ubicacionOnlyOne(ubicacion: Ubicacion, encontrado: boolean, soyYo: boolean, raiz: boolean): boolean {
        if (soyYo === true) {
            ubicacion.localSelected = true;
            for (const ubi of ubicacion.ubicaciones) {
                this.ubicacionOnlyOne(ubi, encontrado, soyYo, false);
            }
            return true;
        }
        if (encontrado === true) {
            ubicacion.localSelected = false;
            for (const ubi of ubicacion.ubicaciones) {
                this.ubicacionOnlyOne(ubi, encontrado, soyYo, false);
            }
            return true;
        }
        if (ubicacion.localSelected === true && raiz === false) {
            ubicacion.localSelected = true;
            for (const ubi of ubicacion.ubicaciones) {
                this.ubicacionOnlyOne(ubi, true, true, false);
            }
            return true;
        }
        for (const ubi of ubicacion.ubicaciones) {
            encontrado = this.ubicacionOnlyOne(ubi, encontrado, soyYo, false);
        }
        return encontrado;
    }


    calculateEstadistica(ubicacion: Ubicacion): EstadisticaValue {
        const newEstadisticaValue = new EstadisticaValue(0, 0);
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                const hijoEstadisticaValue = this.calculateEstadistica(ubi);
                newEstadisticaValue.total += hijoEstadisticaValue.total;
                newEstadisticaValue.seleccionados += hijoEstadisticaValue.seleccionados;
            }
            const ubiOtros = ubicacion.ubicaciones.find((item: Ubicacion) => item.nombre === 'Otros');
            if (ubiOtros != null) { ubiOtros.localEstadistica.valor = ubicacion.localEstadistica.valor - newEstadisticaValue.total; }

            if (ubicacion.localSelected) {
                newEstadisticaValue.seleccionados += ubiOtros ? ubiOtros.localEstadistica.valor : 0;
            }
        } else {
            if (ubicacion.localSelected) {
                newEstadisticaValue.seleccionados = ubicacion.localEstadistica.valor;
            } else {
                newEstadisticaValue.seleccionados = 0;
            }
        }

        newEstadisticaValue.total = ubicacion.localEstadistica.valor;
        ubicacion.localEstadistica.valor = newEstadisticaValue.seleccionados;

        return newEstadisticaValue;
    }


    setEstadisticaInUbicacion(ubicacion: Ubicacion, estadistica: Estadistica) {
        if (ubicacion.idUbicacion === estadistica.fkUbicacion) {
            ubicacion.localEstadistica.idEstadistica = estadistica.idEstadistica;
            ubicacion.localEstadistica.valor = estadistica.valor;
            return;
        }
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setEstadisticaInUbicacion(ubi, estadistica);
            }
        }
    }

    setUbicacion(ubicacion: Ubicacion, estadistica: Estadistica, main: boolean) {
        estadistica.fkUbicacion = ubicacion.idUbicacion;
        ubicacion.localEstadistica = new Estadistica(estadistica);
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            if (!main) {
                const otrosUbicacion = new Ubicacion({ubicacion} as IUbicacion);
                otrosUbicacion.idUbicacion = -1;
                otrosUbicacion.fkUbicacion = ubicacion.idUbicacion;
                otrosUbicacion.nombre = 'Otros';
                ubicacion.ubicaciones.push(otrosUbicacion);
            }
            for (const ubi of ubicacion.ubicaciones) {
                this.setUbicacion(ubi, estadistica, false);
            }
        }
    }

    setUbicacionCopia(ubicacion: Ubicacion, estadistica: Estadistica) {
        const valor = ubicacion.localEstadistica.valor;
        estadistica.fkUbicacion = ubicacion.idUbicacion;
        ubicacion.localEstadistica = new Estadistica(estadistica);
        ubicacion.localEstadistica.valor = valor;
        if (ubicacion.ubicaciones != null && ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setUbicacionCopia(ubi, estadistica);
            }
        }
    }

}
