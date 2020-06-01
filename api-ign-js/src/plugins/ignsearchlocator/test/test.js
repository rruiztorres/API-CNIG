import IGNSearchLocator from 'facade/ignsearchlocator';

M.language.setLang('en');


const map = M.map({
  container: 'mapjs',
  controls: ['scale'],
});

const mp = new IGNSearchLocator({
  CMC_url: 'http://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejeroCodigos.asmx/ConsultaMunicipioCodigos',

  position: 'BL',
  servicesToSearch: 'gn',
  maxResults: 10,
  noProcess: 'poblacion',
  countryCode: 'es',
  isCollapsed: true,
  collapsible: true,
  reverse: true,
});

// map.removeControls('panzoom');

map.addPlugin(mp);

window.map = map;
