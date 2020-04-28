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
    <link type="text/css" rel="stylesheet" href="assets/css/apiign-1.2.0.ol.min.css" />
    <link href="plugins/attributions/attributions.ol.min.css" rel="stylesheet" />
    <link href="plugins/sharemap/sharemap.ol.min.css" rel="stylesheet" />
    <style type="text/css">
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: auto;
        }

        #divModo {
            display: contents;
        }

        #divModo.oculto {
            display: none;
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
            <option value="BL" selected="selected">Abajo Izquierda (BL)</option>
        </select>
        <label for="selectMode">Selector de Modo</label>
        <select name="mode" id="selectMode">
            <option value="1" selected="selected">1</option>
            <option value="2">2</option>
        </select>
        <label for="inputTooltip">Parámetro tooltip</label>
        <input type="text" name="tooltip" id="inputTooltip" list="tooltipSug" value="Reconocimientos">
        <datalist id="tooltipSug">
            <option value="Reconocimientos"></option>
        </datalist>
        <label for="inputScale">Parámetro scale</label>
        <input type="text" name="scale" id="inputScale" list="scaleSug" value="10000">
        <datalist id="scaleSug">
            <option value="10000"></option>
        </datalist>
        <label for="inputDefaultURL">Parámetro defaultURL</label>
        <input type="text" name="defaultURL" id="inputDefaultURL" list="defaultURLSug" value="https://www.ign.es/">
        <datalist id="defaultURLSug">
            <option value="https://www.ign.es/"></option>
        </datalist>
        <label for="inputDefaultAttribution">Parámetro defaultAttribution</label>
        <input type="text" name="defaultAttribution" id="inputDefaultAttribution" list="defaultAttributionSug" value="Instituto Geográfico Nacional">
        <datalist id="defaultAttributionSug">
            <option value="Instituto Geográfico Nacional"></option>
        </datalist>
        <label for="inputMinWidth">Parámetro minWidth</label>
        <input type="text" name="minWidth" id="inputMinWidth" list="minWidthSug" value="100px">
        <datalist id="minWidthSug">
            <option value="100px"></option>
        </datalist>
        <label for="inputMaxWidth">Parámetro maxWidth</label>
        <input type="text" name="maxWidth" id="inputMaxWidth" list="maxWidthSug" value="200px">
        <datalist id="maxWidthSug">
            <option value="200px"></option>
        </datalist>
        <div id="divModo">
            <label for="inputUrl">Parámetro url</label>
            <input type="text" name="url" id="inputUrl" list="urlSug" value="https://componentes.ign.es/NucleoVisualizador/vectorial_examples/atribucionPNOA.kml">
            <datalist id="urlSug">
                <option value="https://componentes.ign.es/NucleoVisualizador/vectorial_examples/atribucionPNOA.kml"></option>
            </datalist>
            <label for="selectType">Selector de tipo</label>
            <select name="type" id="selectType">
                <option value="kml" selected="selected">kml</option>
                <option value="geojson">geojson</option>
            </select>
            <label for="inputLayerName">Parámetro layerName</label>
            <input type="text" name="layerName" id="inputLayerName" list="layerNameSug" value="attributions">
            <datalist id="layerNameSug">
                <option value="attributions"></option>
            </datalist>
            <label for="inputAttributionParam">Parámetro attributionParam</label>
            <input type="text" name="attributionParam" id="inputAttributionParam" list="attributionParamSug" value="atribucion">
            <datalist id="attributionParamSug">
                <option value="atribucion"></option>
            </datalist>
            <label for="inputUrlParam">Parámetro urlParam</label>
            <input type="text" name="urlParam" id="inputUrlParam" list="urlParamSug" value="url">
            <datalist id="urlParamSug">
                <option value="url"></option>
            </datalist>
        </div>
        <input type="button" value="Eliminar Plugin" name="eliminar" id="botonEliminar">
    </div>
    <div id="mapjs" class="m-container"></div>
    <script type="text/javascript" src="vendor/browser-polyfill.js"></script>
    <script type="text/javascript" src="js/apiign-1.2.0.ol.min.js"></script>
    <script type="text/javascript" src="js/configuration-1.2.0.js"></script>
    <script type="text/javascript" src="plugins/attributions/attributions.ol.min.js"></script>
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
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4783459.6216],
        });

        let mp;
        let position, mode, tooltip, scale, defaultURL, defaultAttribution, minWidth, maxWidth,
            url, type, layerName, attributionParam, urlParam;
        crearPlugin({
            mode: 1,
            scale: 10000,
            tooltip: "Reconocimientos"
        });
        const divModo = document.getElementById("divModo");
        const selectPosicion = document.getElementById("selectPosicion");
        const selectMode = document.getElementById("selectMode");
        const inputTooltip = document.getElementById("inputTooltip");
        const inputScale = document.getElementById("inputScale");
        const inputDefaultURL = document.getElementById("inputDefaultURL");
        const inputDefaultAttribution = document.getElementById("inputDefaultAttribution");
        const inputMinWidth = document.getElementById("inputMinWidth");
        const maxWidthSug = document.getElementById("maxWidthSug");
        const inputUrl = document.getElementById("inputUrl");
        const selectType = document.getElementById("selectType");
        const inputLayerName = document.getElementById("inputLayerName");
        const inputAttributionParam = document.getElementById("inputAttributionParam");
        const inputUrlParam = document.getElementById("inputUrlParam");
        selectPosicion.addEventListener('change', cambiarTest);
        selectMode.addEventListener('change', function() {
            divModo.classList.toggle("oculto")
        });
        inputTooltip.addEventListener('change', cambiarTest);
        inputScale.addEventListener('change', cambiarTest);
        inputDefaultURL.addEventListener('change', cambiarTest);
        inputDefaultAttribution.addEventListener('change', cambiarTest);
        inputMinWidth.addEventListener('change', cambiarTest);
        maxWidthSug.addEventListener('change', cambiarTest);
        inputUrl.addEventListener('change', cambiarTest);
        selectType.addEventListener('change', cambiarTest);
        inputLayerName.addEventListener('change', cambiarTest);
        inputAttributionParam.addEventListener('change', cambiarTest);
        inputUrlParam.addEventListener('change', cambiarTest);

        function cambiarTest() {
            let objeto = {}
            objeto.position = selectPosicion.options[selectPosicion.selectedIndex].value;
            mode = selectMode.options[selectMode.selectedIndex].value;
            objeto.mode = parseInt(mode);
            tooltip = inputTooltip.value != "" ? objeto.tooltip = inputTooltip.value : "";
            scale = inputScale.value != "" ? objeto.scale = inputScale.value : "";
            defaultURL = inputDefaultURL.value != "" ? objeto.defaultURL = inputDefaultURL.value : "";
            defaultAttribution = inputDefaultAttribution.value != "" ? objeto.defaultAttribution = inputDefaultAttribution.value : "";
            minWidth = inputMinWidth.value != "" ? objeto.minWidth = inputMinWidth.value : "";
            maxWidth = inputMaxWidth.value != "" ? objeto.maxWidth = inputMaxWidth.value : "";
            if (mode == 1) {
                url = inputUrl.value != "" ? objeto.url = inputUrl.value : "";
                type = selectType.options[selectType.selectedIndex].value;
                objeto.type = type;
                layerName = inputLayerName.value != "" ? objeto.layerName = inputLayerName.value : "";
                attributionParam = inputAttributionParam.value != "" ? objeto.attributionParam = inputAttributionParam.value : "";
                urlParam = inputUrlParam.value != "" ? objeto.urlParam = inputUrlParam.value : "";
            }
            map.removePlugins(mp);
            crearPlugin(objeto);
        }

        function crearPlugin(propiedades) {
            console.log(propiedades);
            mp = new M.plugin.Attributions(propiedades);

            map.addPlugin(mp);
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