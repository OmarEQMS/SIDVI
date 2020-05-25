# SIDVI (Sistema de Información y Diagnóstico de Virus)

Front end del proyecto SIDVI.
Plataforma para informar acerca de diversos virus. El usuario puede conocer información general de cada uno, consultar las estadisticas actuales
filtrando por diversos campos (por ejemplo: virus, localidad, genero, edad...), obtener un pre-diagnóstico al realizar un test de sintomas, encontrar
consultorios cercanos que atiendan dicho virus entre otras cosas.
Todo es gestionable desde la vista del administrador. 

## Estructura del proyecto 

```
.
├── README.md
|
├── node modules
|
├── ...
|
└── src
    ├── api          		# Los servicios, para comunicarse con el back
    │   └── ...
    ├── app        		# Proyecto Angular
    │   ├── administrador	# Proyecto Angular, vista de administrador
    |	└── ...
    |
    └── ...          		# Assets, models...
        
```

## Iniciar

Estas instrucciones le ayudaran a generar una copia del proyecto para correrlo desde su computadora.
Nota importante: Necesitará instalar el back-end para contar con todas las funcionalidades del proyecto ubicado [aquí](https://github.com/OmarEQMS/SIDVI_API.git)

1. Descargar el archivo zip o clonar el proyecto con el siguiente comando
```
$ git clone https://github.com/OmarEQMS/SIDVI.git
```
2. Navegar a **SIDVI/** y ejecutar los siguientes comandos

```
$ npm i
$ ionic serve
```


## Authors

* Omar Quintero Marmol Sánchez - [perfil](https://github.com/OmarEQMS)
* Diego Montoya Martinez - [perfil](https://github.com/diegommtz)
* Fernanda Orduña Rangel - [perfil](https://github.com/FerOrduna28)
* Ariadna Angélica Guemes Estrada - [perfil](https://github.com/AngieGE)
