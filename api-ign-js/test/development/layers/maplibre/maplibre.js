/* eslint-disable camelcase,import/prefer-default-export */
import MapLibre from 'M/layer/MapLibre';

export const maplibre_001 = new MapLibre({
  name: 'Mapa Libre',
  extract: true,
  disableBackgroundColor: false,
  // visibility: true,
  // maxExtent: [-1259872.4694101033, 4359275.566199489, -85799.71494979598, 4620384.454821652],
  style: 'https://vt-mapabase.idee.es/files/styles/mapaBase_scn_color1_CNIG.json',
  // style: 'https://demotiles.maplibre.org/style.json', // JSON, URL
  /*
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
      // Use a different source for terrain and hillshade layers, to improve render quality
      terrainSource: {
        type: 'raster-dem',
        url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
        tileSize: 256,
      },
      hillshadeSource: {
        type: 'raster-dem',
        url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
      {
        id: 'hills',
        type: 'hillshade',
        source: 'hillshadeSource',
        layout: { visibility: 'visible' },
        paint: { 'hillshade-shadow-color': '#473B24' },
      },
    ],
    terrain: {
      source: 'terrainSource',
      exaggeration: 1,
    },
  },
*/
  // opacity: 0.2,
  legend: 'Mapa Libre',
}, {
  // minZoom: 5,
  // maxZoom: 7,
  // minScale: 2000000,
  // maxScale: 7000000,
  // minResolution: 705.5551745557614,
  // maxResolution: 2469.443110945165,
});

export const maplibre_002 = new MapLibre({
  name: 'Mapa Libre DEMO',
  extract: true,
  disableBackgroundColor: false,
  style: 'https://demotiles.maplibre.org/style.json', // JSON, URL
  legend: 'Mapa Libre DEMO Legend',
});

export const maplibre_003 = new MapLibre({
  name: 'Mapa Libre MANUALSTYLE',
  extract: true,
  disableBackgroundColor: false,
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
      // Use a different source for terrain and hillshade layers, to improve render quality
      terrainSource: {
        type: 'raster-dem',
        url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
        tileSize: 256,
      },
      hillshadeSource: {
        type: 'raster-dem',
        url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
      {
        id: 'hills',
        type: 'hillshade',
        source: 'hillshadeSource',
        layout: { visibility: 'visible' },
        paint: { 'hillshade-shadow-color': '#473B24' },
      },
    ],
    terrain: {
      source: 'terrainSource',
      exaggeration: 1,
    },
  },
  legend: 'Mapa Libre MANUALSTYLE Legend',
});