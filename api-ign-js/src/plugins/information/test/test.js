import Information from 'facade/information';

// M.language.setLang('en');

const map = M.map({
  container: 'mapjs',
  controls: ['location'],
  zoom: 7,
  layers: [],
  center: [-447979.2542807377, 4849659.371752165],
});

const mp = new Information({
  position: 'TR',
  buffer: 100,
});

const mp2 = new M.plugin.Infocoordinates({
  position: 'TR',
  decimalGEOcoord: 4,
  decimalUTMcoord: 4,
});

const mp3 = new M.plugin.Vectors({
  collapsed: true,
  collapsible: true,
  position: 'TR',
  wfszoom: 12,
});

const mp4 = new M.plugin.MeasureBar({ position: 'TR' });

const layer1 = new M.layer.WMS({
  url: 'https://www.ign.es/wms-inspire/redes-geodesicas?',
  name: 'RED_NAP',
  legend: 'Red de Nivelación de Alta Presión',
  tiled: true,
  version: '1.1.0',
}, {});

const layer2 = new M.layer.WMS({
  url: 'https://www.ign.es/wms-inspire/redes-geodesicas?',
  name: 'RED_ROI',
  legend: 'Red de Orden Inferior',
  tiled: true,
  version: '1.1.0',
}, {});

const layer3 = new M.layer.WMS({
  url: 'https://www.ign.es/wms-inspire/redes-geodesicas?',
  name: 'RED_REGENTE',
  legend: 'Red REGENTE',
  tiled: true,
  version: '1.1.0',
}, {});

const layer4 = new M.layer.WMS({
  url: 'https://www.ign.es/wms-inspire/redes-geodesicas?',
  name: 'RED_ERGNSS',
  legend: 'Red de Estaciones permanentes GNSS',
  tiled: true,
  version: '1.3.0',
}, {});

map.addLayers([layer1, layer2, layer3, layer4]);
map.addPlugin(mp);
// map.addPlugin(mp2);
// map.addPlugin(mp3);
// map.addPlugin(mp4);
// window.mp = mp;
window.map = map;
