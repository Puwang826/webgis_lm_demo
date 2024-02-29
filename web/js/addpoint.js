lm.addpoint = (function () {
    var clickedLatLng = null;
    function createPopup() {
        map.off('click');
        var poplatlng;
        if(clickedLatLng !== null){
            //当选择出发点时，将信息框定位到该点位置
            poplatlng = clickedLatLng;
        }else {
            //未选择出发点时，信息框定位于页面正上方
            var centerX = window.innerWidth / 2;
            var centerY = 50;
            poplatlng = map.containerPointToLatLng([centerX, centerY]);
        }
        var formContainer = document.createElement("div");
        var form = document.createElement("form");
        var inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("placeholder", "点名...");
        inputName.classList.add("addpoint_input-name");
        var inputMeaning = document.createElement("input");
        inputMeaning.setAttribute("type", "text");
        inputMeaning.setAttribute("placeholder", "点义...");
        inputMeaning.classList.add("addpoint_input-meaning");
        form.appendChild(inputName); // 添加点名输入框
        form.appendChild(inputMeaning); // 添加点义输入框
        formContainer.appendChild(form);

        var coordinatesContainer = document.createElement("div");
        coordinatesContainer.classList.add("coordinates-container");

        // 创建用于显示纬度和经度的元素
        var latitudeDisplay = document.createElement("p");
        latitudeDisplay.textContent = "纬度：";
        latitudeDisplay.classList.add("latitude");
        latitudeDisplay.textContent = "纬度：" + poplatlng.lat.toFixed(6);

        var longitudeDisplay = document.createElement("p");
        longitudeDisplay.textContent = "经度：";
        longitudeDisplay.classList.add("longitude");
        longitudeDisplay.textContent = "经度：" + poplatlng.lng.toFixed(6);
        coordinatesContainer.appendChild(latitudeDisplay);
        coordinatesContainer.appendChild(longitudeDisplay);
        var startPopupContent = document.createElement("div");
        startPopupContent.innerHTML = "<h4 class='start-popup-title'>请添加实习点</h4>";

        var buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        var addButton = document.createElement("button");
        addButton.textContent = "添加";
        addButton.className = "addpoint_add-button";
        // 初始化按钮点击事件
        addButton.addEventListener("click", function () {
            if (clickedLatLng !== null) {
                var data = {
                    "lat": clickedLatLng.lat,
                    "lng": clickedLatLng.lng,
                    "name": inputName.value,
                    "meaning": inputMeaning.value
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8081/webgis/addpointServlet\n', // 更新为您的servlet映射的正确URL
                    data: {
                        name: inputName.value,
                        meaning: inputMeaning.value,
                        lat: clickedLatLng.lat,
                        lng: clickedLatLng.lng,
                    },
                    success: function() {
                        alert("成功添加实习点");
                    },
                    error: function(xhr, status, error) {
                        console.error('错误:', error);
                    }
                });
                console.log(data);
            }
        });
        var clearButton = document.createElement("button");
        clearButton.textContent = "清除";
        clearButton.className = "addpoint_clear-button";
        // 初始化“清除”按钮点击事件
        clearButton.addEventListener("click", function () {
            inputName.value = "";
            inputMeaning.value = "";
        });
        buttonContainer.appendChild(addButton);
        buttonContainer.appendChild(clearButton);

        startPopupContent.appendChild(coordinatesContainer);
        startPopupContent.appendChild(formContainer);
        startPopupContent.appendChild(buttonContainer);

        L.popup({className: "start-popup"}).setLatLng(poplatlng)
            .setContent(startPopupContent)
            .openOn(map);
        map.on('click', function(e) {
            // 获取点击位置的经纬度
            clickedLatLng = e.latlng;
            console.log(clickedLatLng); // 输出经纬度信息
            createPopup();
        });
    }
    function clear() {
        clickedLatLng = null;
        poplatlng = null;
        map.off('click'); // 移除地图的点击事件监听器
    }

    return {
        onload: function () {
            createPopup();
        },
        clear: function () {
            clear();
        }
    };
})();