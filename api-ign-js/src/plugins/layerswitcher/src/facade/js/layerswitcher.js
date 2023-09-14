/* eslint-disable indent */
/**
 * @module M/plugin/Layerswitcher
 */
import '../assets/css/layerswitcher';
import '../assets/css/fonts';
import LayerswitcherControl from './layerswitchercontrol';
import api from '../../api';
import { getValue } from './i18n/language';

import es from './i18n/es';
import en from './i18n/en';

// Estas capas hacen referencia a la estructura de iberpix
const PRECHARGED = {
  services: [{
      name: 'Camino de Santiago',
      type: 'WMS',
      url: 'https://www.ign.es/wms-inspire/camino-santiago',
    },
    {
      name: 'Redes Geodésicas',
      type: 'WMS',
      url: 'https://www.ign.es/wms-inspire/redes-geodesicas',
    },
    {
      name: 'Planimetrías',
      type: 'WMS',
      url: 'https://www.ign.es/wms/minutas-cartograficas',
    },
  ],
  groups: [{
      name: 'Cartografía',
      services: [{
          name: 'Mapas',
          type: 'WMTS',
          url: 'https://www.ign.es/wmts/mapa-raster?',
        },
        {
          name: 'Callejero ',
          type: 'WMTS',
          url: 'https://www.ign.es/wmts/ign-base?',
        },
        {
          name: 'Primera edición MTN y Minutas de 1910-1970',
          type: 'WMTS',
          url: 'https://www.ign.es/wmts/primera-edicion-mtn?',
        },
        {
          name: 'Planimetrías (1870 y 1950)',
          type: 'WMS',
          url: 'https://www.ign.es/wms/minutas-cartograficas?',
        },
        {
          name: 'Planos de Madrid (1622 - 1960)',
          type: 'WMTS',
          url: 'https://www.ign.es/wmts/planos?',
        },
        {
          name: 'Hojas kilométricas (Madrid - 1860)',
          type: 'WMS',
          url: 'https://www.ign.es/wms/hojas-kilometricas?',
        },
        {
          name: 'Cuadrículas Mapa Topográfico Nacional',
          type: 'WMS',
          url: 'https://www.ign.es/wms-inspire/cuadriculas?',
        },

      ],
    },
    {
      name: 'Imágenes',
      services: [{
          name: 'Ortofotos máxima actualidad PNOA',
          type: 'WMTS',
          url: 'https://www.ign.es/wmts/pnoa-ma?',
        },
        {
          name: 'Ortofotos históricas y PNOA anual',
          type: 'WMS',
          url: 'https://www.ign.es/wms/pnoa-historico?',
        },
        {
          name: 'Ortofotos provisionales PNOA',
          type: 'WMS',
          url: 'https://wms-pnoa.idee.es/pnoa-provisionales?',
        },
        {
          name: 'Mosaicos de satélite',
          type: 'WMS',
          url: 'https://wms-satelites-historicos.idee.es/satelites-historicos?',
        },
        {
          name: 'Fototeca (Consulta de fotogramas históricos y PNOA)',
          type: 'WMS',
          url: 'https://wms-fototeca.idee.es/fototeca?',
        },
      ],
    },
    {
      name: 'Información geográfica de referencia y temática',
      services: [{
          name: 'Catastro ',
          type: 'WMS',
          url: 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?',
        },
        {
          name: 'Unidades administrativas',
          type: 'WMS',
          url: ' https://www.ign.es/wms-inspire/unidades-administrativas?',
        },
        {
          name: 'Nombres geográficos (Nomenclátor Geográfico Básico NGBE)',
          type: 'WMS',
          url: 'https://www.ign.es/wms-inspire/ngbe?',
        },
        {
          name: 'Redes de transporte',
          type: 'WMS',
          url: 'https://servicios.idee.es/wms-inspire/transportes?',
        },
        {
          name: 'Hidrografía ',
          type: 'WMS',
          url: 'https://servicios.idee.es/wms-inspire/hidrografia?',
        },
        {
          name: 'Direcciones y códigos postales',
          type: 'WMS',
          url: 'https://www.cartociudad.es/wms-inspire/direcciones-ccpp?',
        },
        {
          name: 'Ocupación del suelo (Corine y SIOSE)',
          type: 'WMTS',
          url: 'https://servicios.idee.es/wmts/ocupacion-suelo?',
        },
        {
          name: 'Ocupación del suelo Histórico (Corine y SIOSE)',
          type: 'WMS',
          url: 'https://servicios.idee.es/wms-inspire/ocupacion-suelo-historico?',
        },
        {
          name: 'Copernicus Land Monitoring Service',
          type: 'WMS',
          url: 'https://servicios.idee.es/wms/copernicus-landservice-spain?',
        },
        {
          name: 'Información sísmica (terremotos)',
          type: 'WMS',
          url: 'https://www.ign.es/wms-inspire/geofisica?',
        },
        {
          name: 'Red de vigilancia volcánica',
          type: 'WMS',
          url: 'https://wms-volcanologia.ign.es/volcanologia?',
        },
        {
          name: 'Redes geodésicas',
          type: 'WMS',
          url: 'https://www.ign.es/wms-inspire/redes-geodesicas?',
        },
      ],
    },
    {
      name: 'Modelos digitales de elevaciones',
      services: [{
          name: 'Modelo Digital de Superficies (Sombreado superficies y consulta de elevaciones edificios y vegetación)',
          type: 'WMTS',
          url: 'https://wmts-mapa-lidar.idee.es/lidar?',
        },
        {
          name: 'Modelo Digital del Terreno (Sombreado terreno y consulta de altitudes)',
          type: 'WMTS',
          url: 'https://servicios.idee.es/wmts/mdt?',
          white_list: ['EL.ElevationGridCoverage'],
        },
        {
          name: 'Curvas de nivel y puntos acotados',
          type: 'WMS',
          url: 'https://servicios.idee.es/wms-inspire/mdt?',
          white_list: ['EL.ContourLine', 'EL.SpotElevation'],
        },
      ],
    },

  ],
};
export default class Layerswitcher extends M.Plugin {
  constructor(options = {}) {
    super();
    // Fachada del mapa
    this.map_ = null;

    // Controles del plugin
    this.controls_ = [];

    // Nombre del plugin
    this.name_ = 'layerswitcher';

    // Parámetros del plugin
    this.options = options;

    // Posición del plugin
    this.position_ = options.position || 'TR';

    // Permite saber si el plugin está colapsado o no
    this.collapsed_ = !M.utils.isUndefined(options.collapsed) ? options.collapsed : true;

    // Permite que el plugin sea colapsado o no
    this.collapsible_ = !M.utils.isUndefined(options.collapsible) ? options.collapsible : true;

    // Tooltip
    this.tooltip_ = options.tooltip || getValue('tooltip');

    // Determina si el plugin es draggable o no
    this.isDraggable = !M.utils.isUndefined(options.isDraggable) ? options.isDraggable : false;

    // Permite saber si se permite movimiento de capas
    this.isMoveLayers = options.isMoveLayers || false;

    // Determina el modo de selección de las capas
    this.modeSelectLayers = M.utils.isUndefined(options.modeSelectLayers) ? 'eyes' : options.modeSelectLayers;

    // Herramientas para mostrar en las capas
    this.tools = M.utils.isUndefined(options.tools) ? ['transparency', 'legend', 'zoom', 'information', 'style', 'delete'] : options.tools;

    // Servicios precargados
    this.precharged = options.precharged || PRECHARGED;

    //  Metadatos
    this.metadata_ = api.metadata;

    //  Determina si permite o no servicios http
    this.http = true;
    if (options.http !== undefined && (options.http === false || options.http === 'false')) {
      this.http = false;
    }

    // Determina si permite o no servicios https
    this.https = true;
    if (options.https !== undefined && (options.https === false || options.https === 'false')) {
      this.https = false;
    }
  }

  // Devuelve el idioma del plugin
  static getJSONTranslations(lang) {
    if (lang === 'en' || lang === 'es') {
      return (lang === 'en') ? en : es;
    }
    return M.language.getTranslation(lang).layerswitcher;
  }

  // Esta función añade el plugin al mapa
  addTo(map) {
    this.map_ = map;
    // creamos control
    this.control_ =
      new LayerswitcherControl({
        isDraggable: this.isDraggable,
        modeSelectLayers: this.modeSelectLayers,
        tools: this.tools,
        collapsed: this.collapsed_,
        isMoveLayers: this.isMoveLayers,
        precharged: this.precharged,
        http: this.http,
        https: this.https,
      });
    // creamos panel
    this.panel_ = new M.ui.Panel('Layerswitcher', {
      className: 'm-plugin-layerswitcher',
      collapsed: this.collapsed_,
      collapsible: this.collapsible_,
      position: M.ui.position[this.position_],
      collapsedButtonClass: 'm-layerswitcher-icons-layers',
      tooltip: this.tooltip_,
    });
    this.controls_.push(this.control_);

    // se dispara evento cuando se añade al mapa
    this.control_.on(M.evt.ADDED_TO_MAP, () => {
      this.fire(M.evt.ADDED_TO_MAP);
    });

    this.panel_.addControls(this.controls_);
    this.map_.addPanels(this.panel_);
  }

  // Esta función devuelve la posición del plugin
  get position() {
    return this.position_;
  }

  //  Esta función devuelve el nombre del plugin
  get name() {
    return this.name_;
  }

  // Esta función devuelve si el panel es collapsible o no
  get collapsed() {
    return this.panel_.isCollapsed();
  }

  // Devuelve la cadena API-REST del plugin
  getAPIRest() {
    return `${this.name}=${this.position_}*${this.collapsed}*${this.collapsible}*${this.tooltip_}*${this.isDraggable}`;
  }

  // Devuelve la cadena API-REST del plugin en base64
  getAPIRestBase64() {
    return `${this.name}=base64=${M.utils.encodeBase64(this.options)}`;
  }

  // Esta función devuelve los metadatos del plugin
  getMetadata() {
    return this.metadata_;
  }

  // Esta función elimina el plugin del mapa
  destroy() {
    this.map_.removeControls([this.control_]);
    [this.control_, this.controls_, this.panel_] = [null, null, null];
  }

  // Esta función devuelve si el plugin recibido por parámetro es instancia de Layerswitcher
  equals(plugin) {
    if (plugin instanceof Layerswitcher) {
      return true;
    }
    return false;
  }
}
