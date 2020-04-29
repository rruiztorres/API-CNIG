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
    <link href="plugins/toc/toc.ol.min.css" rel="stylesheet" />
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
            <option value="TR" selected="selected">Arriba Derecha (TR)</option>
            <option value="BR">Abajo Derecha (BR)</option>
            <option value="BL">Abajo Izquierda (BL)</option>
        </select>

        <label for="selectCollapsed">Selector collapsed</label>
        <select name="collapsedValue" id="selectCollapsed">
            <option value=true>true</option>
            <option value=false selected="selected">false</option>
        </select>
        <input type="button" value="Eliminar Plugin" name="eliminar" id="botonEliminar">
    </div>

    <div id="mapjs" class="m-container"></div>
    <script type="text/javascript" src="vendor/browser-polyfill.js"></script>
    <script type="text/javascript" src="js/apiign-1.2.0.ol.min.js"></script>
    <script type="text/javascript" src="js/configuration-1.2.0.js"></script>
    <script type="text/javascript" src="plugins/toc/toc.ol.min.js"></script>
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

        let layerUA, layerinicial;
        let map = M.map({
            container: 'mapjs',
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4783459.6216],
        });
        layerUA = new M.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeUnit',
            legend: 'Unidad administrativa',
            tiled: false,
        }, {});
        layerinicial = new M.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeBoundary',
            legend: 'Limite administrativo',
            tiled: false,
        }, {
            visibility: false,
        });
        map.addLayers(layerUA);
        map.addLayers(layerinicial);

        let mp, posicion, collapsed;

        crearPlugin(posicion, collapsed, 0);

        const selectPosicion = document.getElementById("selectPosicion");
        const selectCollapsed = document.getElementById("selectCollapsed");

        selectPosicion.addEventListener('change', function() {
            collapsed = (selectCollapsed.options[selectCollapsed.selectedIndex].value == 'true');
            posicion = selectPosicion.options[selectPosicion.selectedIndex].value;
            map.removePlugins(mp);
            map.destroy()
            crearPlugin(posicion, collapsed, 1);

        })

        selectCollapsed.addEventListener('change', function() {
            collapsed = (selectCollapsed.options[selectCollapsed.selectedIndex].value == 'true');
            posicion = selectPosicion.options[selectPosicion.selectedIndex].value;
            map.removePlugins(mp);
            map.destroy()
            crearPlugin(posicion, collapsed, 1);
        })


        function crearPlugin(posicion, collapsed, flag) {
            if (flag === 1) {
                map = M.map({
                    container: 'mapjs',
                    zoom: 5,
                    maxZoom: 20,
                    minZoom: 4,
                    center: [-467062.8225, 4783459.6216],
                });
                layerUA = new M.layer.WMS({
                    url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
                    name: 'AU.AdministrativeUnit',
                    legend: 'Unidad administrativa',
                    tiled: false,
                }, {});
                layerinicial = new M.layer.WMS({
                    url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
                    name: 'AU.AdministrativeBoundary',
                    legend: 'Limite administrativo',
                    tiled: false,
                }, {
                    visibility: false,
                });
                map.addLayers(layerUA);
                map.addLayers(layerinicial);
            }
            mp = new M.plugin.TOC({
                collapsed: collapsed,
                position: posicion,
            });
            map.addPlugin(mp);
            let mp2 = new M.plugin.ShareMap({
                baseUrl: window.location.href.substring(0, window.location.href.indexOf('api-core')) + "api-core/",
                position: "TR",
            });
            map.addPlugin(mp2);
            const botonEliminar = document.getElementById("botonEliminar");
            botonEliminar.addEventListener("click", function() {
                map.removePlugins(mp);
            });
        }
        let mp2 = new M.plugin.ShareMap({
            baseUrl: window.location.href.substring(0, window.location.href.indexOf('api-core')) + "api-core/",
            position: "TR",
        });
        map.addPlugin(mp2);
        const botonEliminar = document.getElementById("botonEliminar");
        botonEliminar.addEventListener("click", function() {
            map.removePlugins(mp);
        });
    </script>
</body>

</html>