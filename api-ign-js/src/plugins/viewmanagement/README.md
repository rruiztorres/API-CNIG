<p align="center">
  <img src="https://www.ign.es/resources/viewer/images/logoApiCnig0.5.png" height="152" />
</p>
<h1 align="center"><strong>APICNIG</strong> <small>🔌 M.plugin.ViewManagement</small></h1>

# Descripción

Plugin que permite utilizar diferentes herramientas de zoom.
- Centrar el mapa la(s) vista(s) indicada(s) por parámetro.
- Realizar zoom con una caja sobre el mapa.
- Navegar entre las vistas visitadas del mapa (hacia delante y atrás).
- Acercar o alejar a una vista del mapa.

# Dependencias

Para que el plugin funcione correctamente es necesario importar las siguientes dependencias en el documento html:

- **viewmanagement.ol.min.js**
- **viewmanagement.ol.min.css**

```html
 <link href="https://componentes.cnig.es/api-core/plugins/viewmanagement/viewmanagement.ol.min.css" rel="stylesheet" />
 <script type="text/javascript" src="https://componentes.cnig.es/api-core/plugins/viewmanagement/viewmanagement.ol.min.js"></script>
```

# Parámetros

El constructor se inicializa con un JSON con los siguientes atributos:

- **position**:  Ubicación del plugin sobre el mapa.
  - 'TL': (top left) - Arriba a la izquierda (por defecto).
  - 'TR': (top right) - Arriba a la derecha.
  - 'BL': (bottom left) - Abajo a la izquierda.
  - 'BR': (bottom right) - Abajo a la derecha.
- **collapsible**: Indica si el plugin se puede collapsar en un botón (true/false). Por defecto: true.
- **collapsed**: Indica si el plugin viene colapsado de entrada (true/false). Por defecto: true.
- **tooltip**: Texto que se muestra al dejar el ratón encima del plugin. Por defecto: Gestión de la vista.
- **isDraggable**: Permite mover el plugin por el mapa. Por defecto: false.
- **predefinedZoom**: Indica si el control PredefinedZoom se añade al plugin (true/false). Por defecto: true (zoom a España). Para añadir los zooms deseados en los que se podrá centrar el mapa se seguirá el siguiente formato:
  ```javascript
  predefinedZoom: [{
    name: 'Zoom1',
    bbox: [-2392173.2372, 3033021.2824, 1966571.8637, 6806768.1648],
  },
  {
    name: 'Zoom2',
    center: [-428106.86611520057, 4334472.25393817],
    zoom: 4,
  }]
  ```
  (Válido sólo para la creación del plugin por JS y API-REST en base64).
- **zoomExtent**: Indica si el control ZoomExtent se añade al plugin (true/false). Por defecto: true.
- **viewhistory**: Indica si el control ViewHistory se añade al plugin (true/false). Por defecto: true.
- **zoompanel**: Indica si el control ZoomPanel se añade al plugin (true/false). Por defecto: true.

# API-REST

```javascript
URL_API?viewmanagement=position*collapsible*collapsed*tooltip*isDraggable*predefinedZoom*zoomExtent*viewhistory*zoompanel
```

<table>
  <tr>
    <td>Parámetros</td>
    <td>Opciones/Descripción</td>
    <td>Disponibilidad</td>
  </tr>
  <tr>
    <td>position</td>
    <td>TR/TL/BR/BL</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>collapsible</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>collapsed</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>tooltip</td>
    <td>tooltip</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>isDraggable</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>predefinedZoom (*)</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>zoomExtent</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>viewhistory</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
  <tr>
    <td>zoompanel</td>
    <td>true/false</td>
    <td>Base64 ✔️ | Separador ✔️</td>
  </tr>
</table>
(*) Este parámetro podrá ser enviado por API-REST con los valores true o false. Si es true indicará al plugin que se añada el control con los valores por defecto. Para añadir los zooms deseados en los que se podrá centrar el mapa se deberá realizar mediante API-REST en base64.

### Ejemplos de uso API-REST

```
https://componentes.cnig.es/api-core?viewmanagement=TL*true*true*tooltip
```

```
https://componentes.cnig.es/api-core?viewmanagement=TL*true*true*tooltip*true*false*true*true*false
```

### Ejemplos de uso API-REST en base64
```
Ejemplo de constructor del plugin: {position:'TL', collapsible: true, collapsed: true, tooltip: 'Gestión de la vista', predefinedZoom: true, zoomExtent: false, viewhistory: true, zoompanel: true}

https://componentes.cnig.es/api-core?viewmanagement=base64:e3Bvc2l0aW9uOidUTCcsIGNvbGxhcHNpYmxlOiB0cnVlLCBjb2xsYXBzZWQ6IHRydWUsIHRvb2x0aXA6ICdHZXN0acOzbiBkZSBsYSB2aXN0YScsIHByZWRlZmluZWRab29tOiB0cnVlLCB6b29tRXh0ZW50OiBmYWxzZSwgdmlld2hpc3Rvcnk6IHRydWUsIHpvb21wYW5lbDogdHJ1ZX0=
```

```
Ejemplo de constructor del plugin: {position:'TL', tooltip: 'Gestión de la vista', predefinedZoom: [{name: 'zoom 1', center: [-428106.86611520057, 4334472.25393817], zoom: 4}, {name: 'zoom 2', bbox: [-2392173.2372, 3033021.2824, 1966571.8637, 6806768.1648]}]}

https://componentes.cnig.es/api-core?viewmanagement=base64:e3Bvc2l0aW9uOidUTCcsIHRvb2x0aXA6ICdHZXN0acOzbiBkZSBsYSB2aXN0YScsIHByZWRlZmluZWRab29tOiBbe25hbWU6ICd6b29tIDEnLCBjZW50ZXI6IFstNDI4MTA2Ljg2NjExNTIwMDU3LCA0MzM0NDcyLjI1MzkzODE3XSwgem9vbTogNH0sIHtuYW1lOiAnem9vbSAyJywgYmJveDogWy0yMzkyMTczLjIzNzIsIDMwMzMwMjEuMjgyNCwgMTk2NjU3MS44NjM3LCA2ODA2NzY4LjE2NDhdfV19
```

# Ejemplo de uso

```javascript
const map = M.map({
  container: 'map'
});

const mp = new M.plugin.ViewManagement({
  position: 'TL',
  collapsible: true,
  collapsed: true,
  predefinedZoom: [{
    name: 'zoom 1',
    center: [-428106.86611520057, 4334472.25393817],
    zoom: 4,
  },
  {
    name: 'zoom 2',
    bbox: [-2392173.2372, 3033021.2824, 1966571.8637, 6806768.1648],
  }],
  zoomExtent: true,
  viewhistory: false,
  zoompanel: true,
  isDraggable: false,
});

map.addPlugin(mp);
```


# 👨‍💻 Desarrollo

Para el stack de desarrollo de este componente se ha utilizado

* NodeJS Version: 14.16
* NPM Version: 6.14.11
* Entorno Windows.

## 📐 Configuración del stack de desarrollo / *Work setup*


### 🐑 Clonar el repositorio / *Cloning repository*

Para descargar el repositorio en otro equipo lo clonamos:

```bash
git clone [URL del repositorio]
```

### 1️⃣ Instalación de dependencias / *Install Dependencies*

```bash
npm i
```

### 2️⃣ Arranque del servidor de desarrollo / *Run Application*

```bash
npm run start
```

## 📂 Estructura del código / *Code scaffolding*

```any
/
├── src 📦                  # Código fuente
├── task 📁                 # EndPoints
├── test 📁                 # Testing
├── webpack-config 📁       # Webpack configs
└── ...
```
## 📌 Metodologías y pautas de desarrollo / *Methodologies and Guidelines*

Metodologías y herramientas usadas en el proyecto para garantizar el Quality Assurance Code (QAC)

* ESLint
  * [NPM ESLint](https://www.npmjs.com/package/eslint) \
  * [NPM ESLint | Airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

## ⛽️ Revisión e instalación de dependencias / *Review and Update Dependencies*

Para la revisión y actualización de las dependencias de los paquetes npm es necesario instalar de manera global el paquete/ módulo "npm-check-updates".

```bash
# Install and Run
$npm i -g npm-check-updates
$ncu
```