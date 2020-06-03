/**
 * @module M/control/PopupControl
 */

import template from 'templates/popup';
import PopupImplControl from 'impl/popupcontrol';
import { getValue } from './i18n/language';

export default class PopupControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(url) {
    if (M.utils.isUndefined(PopupImplControl)) {
      M.exception(getValue('exception_popupcontrol'));
    }
    const impl = new PopupImplControl();
    super(impl, 'Popup');

    /**
     * Help documentation link.
     * @private
     * @type {String}
     */
    this.url_ = url;
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
    if (this.url_ !== 'template') {
      return M.remote.get(this.url_)
        .then((response) => {
          let html = response.text;
          html = html.substring(html.indexOf('<!-- Start Popup Content -->'), html.lastIndexOf('<!-- End Popup Content -->'));
          const htmlObject = document.createElement('div');
          htmlObject.classList.add('m-control', 'm-container', 'm-popup');
          htmlObject.innerHTML = html;
          return htmlObject;
        });
    }
    const htmlObject = document.createElement('div');
    htmlObject.classList.add('m-control', 'm-container', 'm-popup');
    htmlObject.innerHTML = template;
    return htmlObject;
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof PopupControl;
  }
}