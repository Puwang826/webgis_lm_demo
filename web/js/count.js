lm.count = (function () {
    var pointLayer;
    var infoView;

    function loadData() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8081/webgis/countmeaningServlet\n',
            success: function(response) {
                renderChart(response);
            },
            error: function(xhr, status, error) {
                console.error('错误:', error);
            }
        });
    }

    function renderChart(data) {
        infoView = L.control({ position: "bottomright" }); // 将infoView赋值给更高作用域的变量
        var closeButton = createCloseButton();
        infoView.onAdd = function () {
            var div = L.DomUtil.create('div', 'info');
            var contentDiv = L.DomUtil.create('div', 'content');
            contentDiv.appendChild(closeButton);
            div.appendChild(contentDiv);
            contentDiv.appendChild(createEcharts(data));
            return div;
        };
        var content = $(".content");
        content.append(infoView);
        infoView.addTo(map);
    }

    function createCloseButton() {
        var closeButton = L.DomUtil.create('div', 'close-button');
        closeButton.innerHTML = 'X';
        closeButton.addEventListener('click', function () {
            if (infoView) { // 检查infoView是否被定义
                infoView.remove();
            }
        });
        return closeButton;
    }

    function createEcharts(data) {
        var echs = document.createElement("div");
        echs.className = "echarts";
        echs.style.width = "400%";
        echs.style.height = "300px";
        var myChart = echarts.init(echs, { width: 330 });
        var option = {
            title: { text: '各类型实习点数量' },
            tooltip: {},
            xAxis: { data: Object.keys(data) },
            yAxis: {},
            series: [{ name: '数量', type: 'bar', data: Object.values(data) }]
        };
        myChart.setOption(option);
        return echs;
    }

    function clear() {
        if (infoView) {
            infoView.remove();
        }
    }

    return {
        onload: function () {
            loadData();
        },
        clear: function () {
            clear();
        }
    };
})();
