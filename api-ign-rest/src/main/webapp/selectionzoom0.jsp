<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="es.juntadeandalucia.mapea.plugins.PluginsManager"%>
<%@ page import="es.juntadeandalucia.mapea.parameter.adapter.ParametersAdapterV3ToV4"%>
<%@ page import="java.util.Map"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="mapea" content="yes">
    <title>Visor base</title>
    <link type="text/css" rel="stylesheet" href="assets/css/apiign-1.2.0.ol.min.css">
    <link href="plugins/selectionzoom/selectionzoom.ol.min.css" rel="stylesheet" />
    <link href="plugins/sharemap/sharemap.ol.min.css" rel="stylesheet" />
    </link>
    <style type="text/css">
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: auto;
        }
    </style>
    <%
      Map<String, String[]> parameterMap = request.getParameterMap();
      PluginsManager.init (getServletContext());
      Map<String, String[]> adaptedParams = ParametersAdapterV3ToV4.adapt(parameterMap);
      String[] cssfiles = PluginsManager.getCSSFiles(adaptedParams);
      for (int i = 0; i < cssfiles.length; i++) {
         String cssfile = cssfiles[i];
   %>
    <link type="text/css" rel="stylesheet" href="plugins/<%=cssfile%>">
    </link>
    <%
      } %>
</head>

<body>
    <div>
        <label for="selectPosicion">Selector de posición del plugin</label>
        <select name="position" id="selectPosicion">
            <option value="TL">Arriba Izquierda (TL)</option>
            <option value="TR">Arriba Derecha (TR)</option>
            <option value="BR">Abajo Derecha (BR)</option>
            <option value="BL">Abajo Izquierda (BL)</option>
        </select>
        <label for="selectCollapsed">Selector collapsed</label>
        <select name="collapsedValue" id="selectCollapsed">
            <option value=true>true</option>
            <option value=false>false</option>
        </select>
        <label for="selectCollapsible">Selector collapsible</label>
        <select name="collapsibleValue" id="selectCollapsible">
            <option value=true>true</option>
            <option value=false>false</option>
        </select>
        <label for="inputLayerId">Parámetro layerId</label>
        <input type="number" min="0" value="10" name="layerId" id="inputLayerId">
        <label for="selectLayerVisibility">Selector layerVisibility</label>
        <select name="layerVisibilityValue" id="selectLayerVisibility">
            <option value=true>true</option>
            <option value=false>false</option>
        </select>
        <input type="button" value="Eliminar Plugin" name="eliminar" id="botonEliminar">
    </div>
    <div id="mapjs" class="m-container"></div>
    <script type="text/javascript" src="vendor/browser-polyfill.js"></script>
    <script type="text/javascript" src="js/apiign-1.2.0.ol.min.js"></script>
    <script type="text/javascript" src="js/configuration-1.2.0.js"></script>
    <script type="text/javascript" src="plugins/selectionzoom/selectionzoom.ol.min.js"></script>
    <script type="text/javascript" src="plugins/sharemap/sharemap.ol.min.js"></script>
    <%
      String[] jsfiles = PluginsManager.getJSFiles(adaptedParams);
      for (int i = 0; i < jsfiles.length; i++) {
         String jsfile = jsfiles[i];
   %>
    <script type="text/javascript" src="plugins/<%=jsfile%>"></script>

    <%
      }
   %>
    <script type="text/javascript">
        const urlParams = new URLSearchParams(window.location.search);
        M.language.setLang(urlParams.get('language') || 'es');

        const map = M.map({
            container: 'mapjs',
            controls: ['panzoom', 'scale*true', 'scaleline', 'rotate', 'location', 'getfeatureinfo'],
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4683459.6216],
        });

        const layerinicial = new M.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeBoundary',
            legend: 'Limite administrativo',
            tiled: false,
        }, {});

        const layerUA = new M.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeUnit',
            legend: 'Unidad administrativa',
            tiled: false
        }, {});

        map.addLayers([layerinicial, layerUA]);
        
        let mp,mp2;
        let posicion = 'BL', collapsible = true, collapsed = true, layerId = 0, layerVisibility = true;
        let layerOpts = [{
                        id: 'peninsula',
                        preview: 'plugins/selectionzoom/images/espana.png',
                        title: 'Peninsula',
                        bbox: {
                            x: {
                                min: -1200091.444315327,
                                max: 365338.89496508264,
                            },
                            y: {
                                min: 4348955.797933925,
                                max: 5441088.058207252,
                            }
                        },
                        zoom: 7
                    },
                    {
                        id: 'canarias',
                        title: 'Canarias',
                        preview: 'plugins/selectionzoom/images/canarias.png',
                        bbox: {
                            x: {
                                min: -2170190.6639824593,
                                max: -1387475.4943422542,
                            },
                            y: {
                                min: 3091778.038884449,
                                max: 3637844.1689537475,
                            }
                        },
                        zoom: 8
                    },
                    {
                        id: 'baleares',
                        title: 'Baleares',
                        preview: 'plugins/selectionzoom/images/baleares.png',
                        bbox: {
                            x: {
                                min: 115720.89020469127,
                                max: 507078.4750247937,
                            },
                            y: {
                                min: 4658411.436032817,
                                max: 4931444.501067467,
                            }
                        },
                        zoom: 9
                    },
                    {
                        id: 'ceuta',
                        preview: 'plugins/selectionzoom/images/ceuta.png',
                        title: 'Ceuta',
                        bbox: {
                            x: {
                                min: -599755.2558583047,
                                max: -587525.3313326766,
                            },
                            y: {
                                min: 4281734.817081453,
                                max: 4290267.100363785,
                            }
                        },
                        zoom: 14
                    },
                    {
                        id: 'melilla',
                        preview: 'plugins/selectionzoom/images/melilla.png',
                        title: 'Melilla',
                        bbox: {
                            x: {
                                min: -334717.4178261766,
                                max: -322487.4933005484,
                            },
                            y: {
                                min: 4199504.016876071,
                                max: 4208036.300158403,
                            }
                        },
                        zoom: 14
                    }
                ];
                
        crearPlugin(posicion,collapsible,collapsed,layerId,layerVisibility,layerOpts);
    
        const selectPosicion = document.getElementById("selectPosicion");
        const selectCollapsed = document.getElementById("selectCollapsed");
        const selectCollapsible = document.getElementById("selectCollapsible");
        const inputLayerId = document.getElementById("inputLayerId");
        const selectLayerVisibility = document.getElementById("selectLayerVisibility");
        
        selectPosicion.addEventListener('change',cambiarTest);
        selectCollapsed.addEventListener('change',cambiarTest);
        selectCollapsible.addEventListener('change',cambiarTest);
        inputLayerId.addEventListener('change',cambiarTest);
        selectLayerVisibility.addEventListener('change',cambiarTest);

        function cambiarTest(){
            posicion = selectPosicion.options[selectPosicion.selectedIndex].value;
            collapsed = (selectCollapsed.options[selectCollapsed.selectedIndex].value == 'true');
            collapsible = (selectCollapsible.options[selectCollapsible.selectedIndex].value == 'true');
            layerId = parseInt(inputLayerId.value);
            layerVisibility = (selectLayerVisibility.options[selectLayerVisibility.selectedIndex].value == 'true');
            map.removePlugins(mp);
            crearPlugin(posicion,collapsible,collapsed,layerId,layerVisibility,layerOpts);
        }

        function crearPlugin(position,collapsible,collapsed,layerId,layerVisibility,layerOpts){
            mp = new M.plugin.SelectionZoom({
                position: position,
                collapsible: collapsible,
                collapsed: collapsed,
                layerId: layerId,
                layerVisibility: layerVisibility,
                layerOpts: layerOpts,
            });
            map.addPlugin(mp);

            mp2 = new M.plugin.ShareMap({
				baseUrl: window.location.href.substring(0,window.location.href.indexOf('api-core'))+"api-core/",
				position: "TR",
			});
            map.addPlugin(mp2);
        }
        const botonEliminar = document.getElementById("botonEliminar");
        botonEliminar.addEventListener("click",function(){
            map.removePlugins(mp);
        });
    </script>
</body>

</html>