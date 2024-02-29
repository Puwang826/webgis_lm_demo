lm.contour = (function () {
    var contourLayer;
    function onload() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/webgis/contourjsonServlet', // Update to the correct URL for your servlet mapping
            data: { searchContent: null },
            success: function(response) {
                console.log(response);
                // Handle the response and render on the map using Leaflet
                contourLayer = new L.GeoJSON(JSON.parse(response), {
                    style: function (feature) {
                        return {
                            color: 'brown', // 设置线条颜色
                            weight: 0.5 // 设置线条粗细
                        };
                    },
                    // 设置在特定缩放级别下可见
                    minZoom: 10,
                    maxZoom: 15
                }).addTo(map);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function clear() {
        if (contourLayer) {
            map.removeLayer(contourLayer);
            contourLayer = null;
        }
    }

    return {
        onload: function () {
            onload();
        },
        clear: function () {
            clear();
        }
    };
})();
