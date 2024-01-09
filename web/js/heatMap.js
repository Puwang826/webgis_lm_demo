lm.heatMap = (function () {
    var heatmapLayer;
    function onload() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/webgis/querypointServlet', // Update to the correct URL for your servlet mapping
            data: { searchContent: null },
            success: function(response) {
                // Handle the response and render on the map using Leaflet
                console.log(response);
                createheatMap(response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function createheatMap(data){
        var heatmapData = data.map(item => ({
            lat: parseFloat(JSON.parse(item.json).coordinates[1]),
            lng: parseFloat(JSON.parse(item.json).coordinates[0]),
        }));
        heatmapLayer = L.heatLayer(heatmapData, {
            radius: 30,
            maxOpacity: 0.5,
        }).addTo(map);
    }
    // Clean up resources
    function clear() {
        if (heatmapLayer) {
            map.removeLayer(heatmapLayer);
            heatmapLayer = null;
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
