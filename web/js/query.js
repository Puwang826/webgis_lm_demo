// 依据名字查询
lm.query = (function () {
    var pointLayer;
    function query(data) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/webgis/querypointServlet\n', // 更新为您的servlet映射的正确URL
            data: { searchContent: data.field.title },
            success: function(response) {
                // 处理响应，并使用Leaflet在地图上渲染
                renderPointsOnMap(response);
            },
            error: function(xhr, status, error) {
                console.error('错误:', error);
            }
        });
    }
    function renderPointsOnMap(points) {
        var markers = [];

        points.forEach(function(point) {
            var coordinates = JSON.parse(point.json).coordinates;
            var name = point.name;
            var marker = L.marker([coordinates[1], coordinates[0]]);
            marker.bindPopup(name);
            markers.push(marker);
        });
        pointLayer = L.layerGroup(markers).addTo(map);
    }
    function clear() {
        if (pointLayer) {
            map.removeLayer(pointLayer);
        }
    }

    return {
        onload: function (data) {
            query(data);
        },
        clear: function () {
            clear();
        }
    }
})();
