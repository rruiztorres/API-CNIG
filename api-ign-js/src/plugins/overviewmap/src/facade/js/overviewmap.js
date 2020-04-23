/**
 * @module M/plugin/OverviewMap
 */
import 'assets/css/overviewmap';
import OverviewMapControl from './overviewmapcontrol';
import api from '../../api';

export default class OverviewMap extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options, vendorOptions) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Options of the plugin
     * @private
     * @type {Object}
     */
    this.options_ = options || {};

    /**
     * Position of the plugin
     * @private
     * @type {String}
     */
    this.position_ = options.position !== undefined ? options.position : 'BR';

    /**
     * Fixed zoom
     * @private
     * @type {Boolean}
     */
    this.fixed_ = options.fixed !== undefined ? options.fixed : false;

    /**
     * Zoom to make fixed
     * @private
     * @type {Number}
     */
    this.zoom_ = options.zoom !== undefined ? options.zoom : 4;

    /**
     * Zoom to make fixed
     * @private
     * @type {Number}
     */
    this.baseLayer_ = options.baseLayer !== undefined ? options.baseLayer : 'WMTS*http://www.ign.es/wmts/ign-base?*IGNBaseTodo*GoogleMapsCompatible*Mapa IGN*false*image/jpeg*false*false*true';

    /**
     * Vendor options
     * @public
     * @type {Object}
     */
    this.vendorOptions = {
      collapsed: options.collapsed,
      collapsible: options.collapsible,
    };

    if (options !== undefined && options.collapsed !== undefined && (options.collapsed === false || options.collapsed === 'false')) {
      this.vendorOptions.collapsed = false;
    }

    if (options !== undefined && options.collapsible !== undefined && (options.collapsible === false || options.collapsible === 'false')) {
      this.vendorOptions.collapsible = false;
    }

    /**
     * Name of the plugin
     * @public
     * @type {String}
     */
    this.name = 'overviewmap';

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.control_ = new OverviewMapControl(this.options_, this.vendorOptions);
    this.controls_.push(this.control_);
    this.map_ = map;
    this.panel_ = new M.ui.Panel('panelOverviewMap', {
      className: 'm-overviewmap-panel',
      position: M.ui.position[this.position_],
    });
    this.panel_.addControls(this.controls_);
    map.addPanels(this.panel_);
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata() {
    return this.metadata_;
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api
   */
  destroy() {
    this.map_.removeControls([this.control_]);
    [this.map_, this.control_, this.panel_] = [null, null, null];
  }

  /**
   * Get the API REST Parameters of the plugin
   *
   * @function
   * @public
   * @api
   */
  getAPIRest() {
    return `${this.name}=${this.position_}*!${this.vendorOptions.collapsed}*!${this.vendorOptions.collapsible}*!${this.fixed_}*!*!${this.baseLayer_}`;
  }
}
