/**
 * @module M/control/ComparepanelControl
 */

import ComparepanelImplControl from 'impl/comparepanelcontrol';
import template from 'templates/comparepanel';
import { getValue } from './i18n/language';
import Mirrorpanel from './cpmirrorpanel';
import Timeline from './cptimeline';
import LyrCompare from './cplyrcompare';
import Transparency from './cptransparency';

export default class ComparepanelControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(options) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(ComparepanelImplControl)) {
      M.exception(getValue('exception'));
    }
    // 2. implementation of this control
    const impl = new ComparepanelImplControl();
    super(impl, 'Comparepanel');
    /**
     * Template
     * @public
     * @type { HTMLElement }
     */
    this.template = null;
    this.baseLayers = options.baseLayers;
    this.position = options.position;
    this.layers = [];
    this.defaultComparisonMode = options.defaultComparisonMode;
    this.defaultComparisonViz = options.defaultComparisonViz;
    this.previousComparisonMode = "";
    this.actualComparisonMode = "";
    this.urlCover =  options.urlCover;

    this.baseLayers.forEach(e => this.layers.push(e[2]));
    this.params = [options.mirrorpanelParams, options.timelineParams, options.lyrcompareParams, options.transparencyParams];
    this.params.forEach(p => {
      p.position = this.position;
    });

    options.mirrorpanelParams.defaultBaseLyrs = this.layers;
    options.timelineParams.intervals = this.baseLayers;         //e2m: TimeLine needs this.baseLayers with the time param
    options.lyrcompareParams.layers = this.layers;
    options.transparencyParams.layers = this.layers;
    this.mirrorpanel = new Mirrorpanel(options.mirrorpanelParams);
    this.timeline = new Timeline(options.timelineParams);
    
    this.lyrcompare = new LyrCompare(options.lyrcompareParams);
    this.transparency = new Transparency(options.transparencyParams);
    this.panels = [];
    this.plugins = [this.mirrorpanel, this.timeline, this.lyrcompare, this.transparency];
    
    this.map = null;
    this.lyrCoverture = null;
    this.urlCover =  options.urlCover;
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    this.map = map;
    return new Promise((success, fail) => {
      let options = {
        jsonp: true,
        vars: {
          translations: {
            tooltipLyr: getValue('tooltipLyr'),
            tooltipMirrorpanel: getValue('tooltipMirrorpanel'),
            tooltipTimeline: getValue('tooltipTimeline'),
            tooltipTransparency: getValue('tooltipTransparency'),
          }
        }
      };

      this.template = M.template.compileSync(template, options);
      success(this.template);
      this.addComparators(map);

    });
  }

  addComparators(map) {
    this.plugins.forEach((p, index) => {
      map.addPlugin(p);
      this.panels.push(p.panel_._element);
      let element = document.querySelector('.' + p.panel_._className + ' .m-panel-controls');
      element.classList.add('cp-' + p.name);
      document.querySelector('.' + p.panel_._className).remove();
      this.template.querySelector('#m-cp-' + p.name).append(element);
      if (index === this.plugins.length - 1) {
        this.addButtonEvents();
      }
    });
    this.setComparatorsDefaultStyle();


    this.loadCoverPNOALyr();

    this.onMoveEnd((evt) => {
      this.getCobertura(evt);
    });



  }

  addButtonEvents() {
    this.plugins.forEach(p => {
      //this.template.querySelector('#m-cp-' + p.name + ' .cp-button').addEventListener('click', (e) => {
      if (p.name==='mirrorpanel'){
        this.template.querySelector('#m-cp-' + p.name + ' .cp-button').addEventListener('click', (e) => {
          this.deactivateAndActivateMirrorPanel(p);
        });        
        
      }else{
        this.template.querySelector('#m-cp-' + p.name + ' .cp-button').addEventListener('click', (e) => {
          this.deactivateAndActivateOtherModes(p);
        });
      }
    });
  }

  setComparatorsDefaultStyle(){
    console.log(`defaultComparisonMode: ${this.defaultComparisonMode}`);
    console.log(`defaultComparisonViz: ${this.defaultComparisonViz}`);

    if ((this.defaultComparisonMode==='mirrorpanel') && (this.defaultComparisonViz===0)) {
      console.log("Modo defecto");
    }else{
      this.template.querySelector('#m-cp-' + this.defaultComparisonMode + ' .cp-' + this.defaultComparisonMode).classList.toggle('hide-panel');  // Muestro panel
      this.template.querySelector('#m-cp-' + this.defaultComparisonMode + ' .cp-button').classList.toggle('active');                             // Añado scolor botón CamparePanel
    }

    this.plugins.forEach(p => {
      if (p.name === this.defaultComparisonMode){
        if (p.name==='transparency') {
          p.setDefaultLayer();
        }
        if (p.name==='timeline') {
          p.setDefaultLayer(this.defaultComparisonViz);
        }        
      }
    });

    if (this.defaultComparisonMode==='mirrorpanel') {
      // this.template.querySelector('#m-cp-mirrorpanel .cp-mirrorpanel').classList.toggle('hide-panel');  // Oculto panel
      // this.template.querySelector('#m-cp-mirrorpanel .cp-button').classList.toggle('active');         // Elimino sonbra botón
    }

  }

  deactivateAndActivateMirrorPanel(plugin) {
    console.log("deactivateAndActivateMirrorPanel");
    this.actualComparisonMode = plugin.name;
    this.template.querySelector('#m-cp-mirrorpanel .cp-mirrorpanel').classList.toggle('hide-panel');  // Oculto panel
    this.template.querySelector('#m-cp-mirrorpanel .cp-button').classList.toggle('active');         // Elimino sonbra botón
    this.plugins.forEach(p => {
      console.log(p);
      if (p.name !== 'mirrorpanel') {
        p.deactivate();
        this.template.querySelector('#m-cp-' + p.name + ' .cp-' + p.name).classList.remove('hide-panel');  // Oculto panel
        this.template.querySelector('#m-cp-' + p.name + ' .cp-button').classList.remove('active');           // Elimino sonbra botón
        }
    });

  }

  deactivateAndActivateOtherModes(plugin) {

    this.actualComparisonMode = plugin.name;
    if (plugin.name === 'mirrorpanel') return;
    this.plugins.forEach(p => {
      if (p.name !== plugin.name) {
        this.template.querySelector('#m-cp-' + p.name + ' .cp-' + p.name).classList.remove('hide-panel');
        this.template.querySelector('#m-cp-' + p.name + ' .cp-button').classList.remove('active');
        p.deactivate();
      } else if (plugin.name !== 'mirrorpanel') {
        p.deactivate();
      }
    });

    this.template.querySelector('#m-cp-' + plugin.name + ' .cp-button').classList.toggle('active');
    if (this.template.querySelector('#m-cp-' + plugin.name + ' .cp-button').classList.contains('active') && plugin.name === 'transparency') {
      plugin.activate();
    }
    this.template.querySelector('#m-cp-' + plugin.name + ' .cp-' + plugin.name).classList.toggle('hide-panel');
    this.template.querySelector('#m-cp-mirrorpanel .cp-mirrorpanel').classList.remove('hide-panel');  // Oculto panel
    this.template.querySelector('#m-cp-mirrorpanel .cp-button').classList.remove('active');           // Elimino sonbra botón
    
  }

  /**
       * @public
       * @function
       */
  loadCoverPNOALyr() {
    let estiloPoly = new M.style.Polygon({
      fill: {
        color: 'green',
        opacity: 0.0,
      },
      /*stroke: {
        color: '#FF0000',
        width: 0,
      }*/
    });// Estilo no visible

    const optionsLayer = {
      name: 'coverpnoa',
      url: this.urlCover,
    };
    this.lyrCoverture = new M.layer.GeoJSON(optionsLayer, { displayInLayerSwitcher: false });

    this.map.addLayers(this.lyrCoverture);
    this.lyrCoverture.displayInLayerSwitcher = false;
    this.lyrCoverture.setVisible(true);
    this.lyrCoverture.setStyle(estiloPoly);

  }


  onMoveEnd(callback) {

    const olMap = this.map.getMapImpl();
    olMap.on('moveend', e => callback(e));

  }


  getCobertura(evt) {
    const olMap = this.map.getMapImpl();
    //const extent = olMap.getView().calculateExtent(olMap.getSize());
    let pixelCentral = olMap.getPixelFromCoordinate(olMap.getView().getCenter());
    let lyrAvailable = [];
    //console.log(pixelCentral);
    olMap.forEachFeatureAtPixel(pixelCentral, function (feature, layer) {
      //console.log(feature);
      //console.log(layer);    
      if (feature.get('layerkey') !== undefined) {
        lyrAvailable.push(feature.get('layerkey'));
      }
    });
    this.mirrorpanel.manageLyrAvailable(lyrAvailable);
    this.lyrcompare.manageLyrAvailable(lyrAvailable);
    this.transparency.manageLyrAvailable(lyrAvailable);

  }





  deactivate() {
    this.plugins.forEach((p, k) => {
      p.deactivate();
      document.querySelector('.m-plugin-comparepanel').parentElement.append(this.panels[k]);
    });

    this.map.removePlugins(this.plugins);
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   * @return {Boolean}
   */
  equals(control) {
    return control instanceof ComparepanelControl;
  }
}