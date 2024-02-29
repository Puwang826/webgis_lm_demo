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
        // 切换高程测量状态的函数
        window.toggleElevationMeasurement = function() {
            var button = document.getElementById('elevation-button');
            if (!measuringElevation) {
                // 开启高程测量
                measuringElevation = true;
                button.style.backgroundColor = 'gray';
                map.on('click', measureElevation);
            } else {
                // 关闭高程测量
                measuringElevation = false;
                button.style.backgroundColor = '';
                map.off('click', measureElevation);
            }
        }
        // 处理地图点击事件，显示点击点的高程
        function measureElevation(e) {
            var latlng = e.latlng;
            // 这里应该根据经纬度获取对应点的高程，这里只是示例
            // if (latlng.lat >= 40 && latlng.lat <= 50 && latlng.lng >= -10 && latlng.lng <= 10) {
            if (1) {
                // 如果在范围内，则获取高程信息
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8081/webgis/queryelveServlet\n', // 更新为您的servlet映射的正确URL
                    data: {
                        lat: latlng.lat,
                        lng: latlng.lng,
                    },
                    success: function(response) {
                        // 处理响应，并使用Leaflet在地图上渲染
                        L.popup()
                            .setLatLng(latlng)
                            .setContent('高程：' + response.toFixed(2) + '米')
                            .openOn(map);
                    },
                    error: function(xhr, status, error) {
                        console.error('错误:', error);
                    }
                });
            } else {
                // 如果不在范围内，则在网页上显示提示信息
                alert('点击点超出范围');
            }
        }
        // 创建测量高程控件类
        var ElevationControl = L.Control.extend({
            onAdd: function(map) {
                var container = L.DomUtil.create('div', 'elevation-control');
                container.innerHTML = '<button id="elevation-button" onclick="toggleElevationMeasurement()"></button>';
                return container;
            }
        });
        // 将测量高程控件添加到地图上
        var elevationControl = new ElevationControl({ position: 'topright' });
        elevationControl.addTo(map);
        // 标记是否正在进行高程测量
        var measuringElevation = false;
    }

    return {
        addmap: function () {
            addmap();
        }
    }
})();
