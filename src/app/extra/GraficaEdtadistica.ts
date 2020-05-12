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
    // Static
    public static staticUbicacion: Ubicacion;

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
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        borderWidth: 2
                                    }, {
                                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        borderWidth: 2
                                    }, {
                                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                        borderColor: 'rgba(255, 206, 86, 1)',
                                        borderWidth: 2
                                    }, {
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 2
                                    }, {
                                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                        borderColor: 'rgba(153, 102, 255, 1)',
                                        borderWidth: 2
                                    }, {
                                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                        borderColor: 'rgba(255, 159, 64, 1)',
                                        borderWidth: 2
                                    }
    ];

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
                fkSubcategoriaEstadistica1 = -1;
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
                    return;
                }
                fkSubcategoriaEstadistica2 = -1;
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
                for (const subcategoria of this.categoriaEstadistica.subcategoriaEstadisticas) {
                    subcategoria.localCategoriaEstadistica = new CategoriaEstadistica(this.categoriaSelectedGrupo);
                }
                break;
            }
            case 3: { // Añadir filtro
                for (const subcategoria of this.categoriaEstadistica.subcategoriaEstadisticas) {
                    subcategoria.localCategoriaEstadistica = new CategoriaEstadistica({idCategoriaEstadistica: this.categoriaSelectedGrupo.idCategoriaEstadistica, nombre: this.categoriaSelectedGrupo.nombre});
                    subcategoria.localCategoriaEstadistica.subcategoriaEstadisticas.push(new SubcategoriaEstadistica({idSubcategoriaEstadistica: this.subcategoriaSelectedGrupo.idSubcategoriaEstadistica, nombre: this.subcategoriaSelectedGrupo.nombre}));
                }
                break;
            }
        }

        sidvi.estadistica.listarEstadisticas(this.idVirus, null, fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2, fkCategoriaEstadistica1, fkCategoriaEstadistica2, null, null, 'fecha', OrderModeEnum.ASC).subscribe(
            estadis => {
                const estadisticas = estadis.resultados.map((item: any) => new Estadistica(item));
                for (const estadistica of estadisticas) {
                    const subcategoria = this.getSubcategoria(estadistica.fkSubcategoriaEstadistica1, estadistica.fkSubcategoriaEstadistica2);
                    const ubicacion = this.getUbicacionFecha(subcategoria, estadistica);
                    this.setEstadisticaEnUbicacion(ubicacion, estadistica);
                }
                this.setEstadisticasUbicaciones();
                this.setDataChart();
        });
    }

    // Metodo para limpiar las ubicaciones selected, a que sean solo de un hijo
    ubicacionOnlyOne(ubicacion: Ubicacion, encontrado: boolean, soyYo: boolean, raiz: boolean): boolean {
        if (soyYo === true) {
            ubicacion.localSelected = true;
            for (const ubi of ubicacion.ubicaciones) {
                this.ubicacionOnlyOne(ubi, true, true, false);
            }
            return true;
        }
        if (encontrado === true) {
            ubicacion.localSelected = false;
            for (const ubi of ubicacion.ubicaciones) {
                this.ubicacionOnlyOne(ubi, true, false, false);
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
            encontrado = this.ubicacionOnlyOne(ubi, encontrado, false, false);
        }
        return encontrado;
    }

    // Metodo para obtener la subcategoria a la que se debera añadir la estadistica
    getSubcategoria(fkSubcategoriaEstadistica1: number, fkSubcategoriaEstadistica2: number) {
        if (fkSubcategoriaEstadistica1 == null && fkSubcategoriaEstadistica1 == null) { return; }
        if (fkSubcategoriaEstadistica1 == null) {
            fkSubcategoriaEstadistica1 = fkSubcategoriaEstadistica2;
            fkSubcategoriaEstadistica2 = null;
        }
        const arrIds = [fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2];

        let subcategoria = this.categoriaEstadistica.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => arrIds.includes(item.idSubcategoriaEstadistica));
        if (fkSubcategoriaEstadistica2 != null) {
             subcategoria = subcategoria.categoriaEstadistica.subcategoriaEstadisticas.find((item: SubcategoriaEstadistica) => arrIds.includes(item.idSubcategoriaEstadistica));
        }
        return subcategoria;
    }

    // Metodo para obtener el nodo ubicacion al que pertenece la fecha
    getUbicacionFecha(subcategoria: SubcategoriaEstadistica, estadistica: Estadistica) {
        let ubicacionFecha = subcategoria.localUbicaciones.find((item: Ubicacion) => item.localEstadistica.localFecha === estadistica.localFecha);
        if (ubicacionFecha == null) {
            const generalEstadistica = new Estadistica({ fecha: estadistica.fecha, valor: 0 });
            for (const subcat of this.categoriaEstadistica.subcategoriaEstadisticas) {
                if (subcat.categoriaEstadistica != null) { // tiene grupo o filtro
                    for (const sub of subcat.categoriaEstadistica.subcategoriaEstadisticas) {
                        if (sub.localUbicaciones.length > 0) {
                            sub.localUbicaciones.push(new Ubicacion(sub.localUbicaciones[sub.localUbicaciones.length - 1]));
                            this.setUbicacionEstadistica(subcat.localUbicaciones[subcat.localUbicaciones.length - 1], generalEstadistica);
                        } else {
                            subcat.localUbicaciones.push(new Ubicacion(GraficaEdtadistica.staticUbicacion));
                            this.setNewUbicacionEstadistica(subcat.localUbicaciones[subcat.localUbicaciones.length - 1], generalEstadistica, true);
                        }
                    }
                } else {
                    if (subcat.localUbicaciones.length > 0) {
                        subcat.localUbicaciones.push(new Ubicacion(subcat.localUbicaciones[subcat.localUbicaciones.length - 1]));
                        this.setUbicacionEstadistica(subcat.localUbicaciones[subcat.localUbicaciones.length - 1], generalEstadistica);
                    } else {
                        subcat.localUbicaciones.push(new Ubicacion(GraficaEdtadistica.staticUbicacion));
                        this.setNewUbicacionEstadistica(subcat.localUbicaciones[subcat.localUbicaciones.length - 1], generalEstadistica, true);
                    }
                }
            }
            ubicacionFecha = subcategoria.localUbicaciones.find((item: Ubicacion) => item.localEstadistica.localFecha === estadistica.localFecha);
        }
        return ubicacionFecha;
    }

    // Metodo para inicializar un nuevo arbol de ubicacion
    setNewUbicacionEstadistica(ubicacion: Ubicacion, estadistica: Estadistica, main: boolean) {
        ubicacion.localEstadistica = new Estadistica(estadistica);
        if (ubicacion.ubicaciones.length > 0) {
            if (!main) {
                ubicacion.ubicaciones.push(new Ubicacion({
                    idUbicacion: -1,
                    fkUbicacion: ubicacion.idUbicacion,
                    nombre: 'Otros',
                    localEstadistica: new Estadistica(estadistica)
                }));
            }
            for (const ubi of ubicacion.ubicaciones) {
                this.setNewUbicacionEstadistica(ubi, estadistica, false);
            }
        }
    }

    // Metodo para actualizar la fecha de la ubicacion
    setUbicacionEstadistica(ubicacion: Ubicacion, estadistica: Estadistica) {
        ubicacion.localEstadistica.localFecha = estadistica.localFecha;
        if (ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setUbicacionEstadistica(ubi, estadistica);
            }
        }
    }

    // Metodo para setear una estadistica en una ubicacion
    setEstadisticaEnUbicacion(ubicacion: Ubicacion, estadistica: Estadistica) {
        if (ubicacion.idUbicacion === estadistica.fkUbicacion) {
            ubicacion.localEstadistica.valor = estadistica.valor;
            return;
        }
        if (ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                this.setEstadisticaEnUbicacion(ubi, estadistica);
            }
        }
    }

    // Metodo para llamar al calculo de todas las ubicaciones
    setEstadisticasUbicaciones() {
        for (const subcat of this.categoriaEstadistica.subcategoriaEstadisticas) {
            if (subcat.categoriaEstadistica != null) { // tiene grupo o filtro
                for (const sub of subcat.categoriaEstadistica.subcategoriaEstadisticas) {
                    for (const ubicacion of sub.localUbicaciones) {
                        this.calculateEstadisticaUbicacion(ubicacion);
                    }
                }
            } else {
                for (const ubicacion of subcat.localUbicaciones) {
                    this.calculateEstadisticaUbicacion(ubicacion);
                }
            }
        }
    }

    // Metodo para ajustar las estadisticas de las ubicaciones
    calculateEstadisticaUbicacion(ubicacion: Ubicacion): EstadisticaValue {
        const newEstadisticaValue = new EstadisticaValue(0, 0);
        if (ubicacion.ubicaciones.length > 0) {
            for (const ubi of ubicacion.ubicaciones) {
                const hijoEstadisticaValue = this.calculateEstadisticaUbicacion(ubi);
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

    // Metodo para actualizar la grafica
    setDataChart() {
        switch (this.subcategoriaEjeHorizontal) {
            case 1: { // Subcategoria
                const cat = this.categoriaEstadistica;
                this.localChartLabels = cat.subcategoriaEstadisticas.map((item: SubcategoriaEstadistica) => item.nombre);
                const data: number[] = new Array<number>(0);
                for (const subcat of cat.subcategoriaEstadisticas) {
                    if (subcat.localUbicaciones.length > 0) {
                        data.push(subcat.localUbicaciones[subcat.localUbicaciones.length - 1].localEstadistica.valor);
                    } else {
                        data.push(0);
                    }
                }
                this.localChartDatasets = [{ data, label: cat.nombre }, { data, label: cat.nombre }];
                break;
            }
            case 2: { // Tiempo
                const subcat = this.categoriaEstadistica.subcategoriaEstadisticas[0];
                this.localChartLabels = subcat.localUbicaciones.map((item: Ubicacion) => item.localEstadistica.localFecha);
                const data: number[] = new Array<number>(0);
                for (const ubicacion of subcat.localUbicaciones) {
                    data.push(ubicacion.localEstadistica.valor);
                }
                this.localChartDatasets = [{ data, label: subcat.nombre }];
                break;
            }
            case 3: { // Ubicacion
                const subcat = this.categoriaEstadistica.subcategoriaEstadisticas[0];
                this.localChartLabels = subcat.localUbicaciones.map((item: Ubicacion) => item.localEstadistica.localFecha);
                const data: number[] = new Array<number>(0);
                for (const ubicacion of subcat.localUbicaciones) {
                    data.push(ubicacion.localEstadistica.valor);
                }
                this.localChartDatasets = [{ data, label: subcat.nombre }];
                break;
            }
            case 4: { // Mapa

                break;
            }
        }
    }

}
