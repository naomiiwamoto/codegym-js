
function areaWhether() {
    //プルダウンの情報を受け取る
    var city = document.getElementById("city").value;
    var text = '';
    if (city === 'London') {
        currentWhether();
    }
    else if (city === 'Tokyo') {
        currentWhether();
    }
    else if (city === 'Paris') {
        currentWhether();
    }
    else if (city === 'New York') {
        currentWhether();
    }
    else if (city === 'Indonesia') {
        currentWhether();
    }
};

//Ajaxで情報を取得
function currentWhether() {

    var city = document.getElementById("city").value;
    var api_key = "4b5774e9f3d2a07b84f0f2f88e486224";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key + "&lang=ja&units=metric";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

            const obj = JSON.parse(xhr.responseText);
            var whether = (obj.weather[0].description);//天気
            var temperature = (obj.main.temp);//気温
            var humidity = (obj.main.humidity);//湿度



            document.getElementById("whether").innerText = whether;
            document.getElementById("humidity").innerText = humidity;
            document.getElementById("temperature").innerText = temperature;



        }
    }
}




