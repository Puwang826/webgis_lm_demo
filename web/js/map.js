// 地图加载
lm = {};
lm.map = (function () {
    function addmap() {
        const vecURL = "http://t0.tianditu.gov.cn/vec_w/wmts?"+
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
            "&tk=e6372a5333c4bac9b9ef6097453c3cd6";
        var tiandituvec = L.tileLayer(vecURL,{
            attribution: "stamen"
        });
        const imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
            "&tk=f63d2a8c01570dbb33c788e285385c03";
        var tiandituimg = L.tileLayer(imageURL,{
            attribution: "stamen"
        });
        var osmlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="OpenStreetMaphttps://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
        var wmsLayer = L.tileLayer.wms(
            'http://localhost:8081/geoserver_war/wms', {
                layers: 'lu:Export_Output',
                format: 'image/png',
                transparent: true
            }
        );

        //实例化map对象，一样是全局变量
        window.map = L.map('map', {
            //这里可能要考虑坐标系统一的问题
            center: { lng: 115.96782, lat: 29.55539 },
            //初始级别设置：
            zoom: 15,
            layers: [tiandituvec, wmsLayer],
            preferCanvas: true,
            zoomControl: false,
        });

        // 添加图层切换控件
        var baseMaps = {
            "矢量图层":tiandituvec,
            "影像图层":tiandituimg,
            "OSM图层": osmlayer,
        };
        var overlayMaps = {
            "九江":wmsLayer
        };
        L.control.layers(baseMaps, overlayMaps,{
            position:'topright'
        }).addTo(map);

        // 创建缩放控件
        var zoomControl = L.control.zoom(
            {
                position:'topright'
            }
        );
        // 将缩放控件添加到地图
        zoomControl.addTo(map);
        //图层控件
    }

    return {
        addmap: function () {
            addmap();
        }
    }
})();
