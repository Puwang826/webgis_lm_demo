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

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/webgis/contourjsonServlet\n',
            success: function(response) {
                console.log(JSON.parse(response));
                renderContours(JSON.parse(response));

            },
            error: function(xhr, status, error) {
                console.error('错误:', error);
            }
        });
        function renderContours(data) {
            // 使用 D3.js 创建 SVG 元素
            function projectPoint(x, y) {
                var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                console.log("1");
                this.stream.point(point.x, point.y);
            }
            var projection = d3.geo.transform({point: projectPoint});
            var svg = d3.select(map._container).append('svg');
            var g = svg.append('g').attr('class', 'leaflet-zoom-hide');
            const colorScale = d3.scaleSequential(d3.interpolateViridis)
                .domain(d3.extent(data.features, function(d) { return d.properties.ELEV; }))
                .interpolator(d3.interpolateRgb("rgb(255,255,224)", "rgb(160,82,45)"));
            const path = d3.geoPath().projection(projection);
            // 使用 Leaflet 的 d3Layer 创建图层
            var d3Layer = L.supermap.d3Layer(function(selection, projection) {

                // 在此处使用 D3.js 渲染等高线数据
                var contours = selection.selectAll('contour-line').data(data.features);
                contours
                    .data(data.features)
                    .enter().append("path")
                    .attr("class", "contour-line")
                    .attr("d", path)
                    .style("fill", "none")
                    .style("stroke", function(d) {
                        // 你可以根据高程字段来设置等高线的颜色
                        return colorScale(d.properties.ELEV);
                    });
            });
            initializeMap(d3Layer);  // 在 D3 图层创建完成后初始化地图
        }
        function initializeMap(d3Layer) {
            // 实例化 map 对象，一样是全局变量

            window.map = L.map('map', {
                //这里可能要考虑坐标系统一的问题
                center: { lng: 115.96782, lat: 29.55539 },
                //初始级别设置：
                zoom: 15,
                layers: [tiandituvec],
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
                "D3Layer": d3Layer, // 将 D3Layer 添加到可选图层
            };
            L.control.layers(baseMaps, overlayMaps, {
                position: 'topright'
            }).addTo(map);
            // 创建缩放控件
            var zoomControl = L.control.zoom(
                {
                    position:'topright'
                }
            );
            // 将缩放控件添加到地图
            zoomControl.addTo(map);
            console.log(d3Layer);
        }
    }

    return {
        addmap: function () {
            addmap();
        }
    }
})();
