//プルダウンの情報を受け取る
const city = document.getElementById("city").value;
if (['London', 'Tokyo', 'Paris', 'New York', 'Indonesia'].includes(city)) {
    currentWeather();
}
//Ajaxで情報を取得
const currentWeather = () => {

    const city = document.getElementById("city").value;
    const api_key = "4b5774e9f3d2a07b84f0f2f88e486224";
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key + "&lang=ja&units=metric";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

            const obj = JSON.parse(xhr.responseText);
            const weather = obj.weather[0].description; //天気
            const temperature = obj.main.temp; //気温
            const humidity = obj.main.humidity; //湿度
            document.getElementById("weather").innerText = weather;
            document.getElementById("humidity").innerText = humidity;
            document.getElementById("temperature").innerText = temperature;
        }
    };
}
