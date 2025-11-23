const apiKey = "8c3f4364e0dde4c6f1b7843868b6afd0"; // <-- đặt key vào đây

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                showError("Không tìm thấy thành phố!");
                return;
            }

            renderWeather(data);
        })
        .catch(() => showError("Lỗi kết nối API!"));
}

function renderWeather(data) {
    document.getElementById("error").innerText = "";

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("description").innerText = data.weather[0].description;

    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;

    // Icon API
    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Hiển thị box
    document.getElementById("weather-box").classList.remove("hidden");

    // Đổi background theo thời tiết
    changeBackground(data.weather[0].main);
}

function changeBackground(weather) {
    if (weather === "Rain") {
        document.body.style.background = "linear-gradient(#4b79a1,#283e51)";
    } else if (weather === "Clear") {
        document.body.style.background = "linear-gradient(#fceabb,#f8b500)";
    } else if (weather === "Clouds") {
        document.body.style.background = "linear-gradient(#757f9a,#d7dde8)";
    } else if (weather === "Snow") {
        document.body.style.background = "linear-gradient(#e6e9f0,#eef1f5)";
    } else {
        document.body.style.background = "linear-gradient(#4facfe,#00f2fe)";
    }
}

function showError(msg) {
    document.getElementById("error").innerText = msg;
    document.getElementById("weather-box").classList.add("hidden");
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError("Trình duyệt không hỗ trợ định vị!");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;

        fetch(url)
            .then(res => res.json())
            .then(data => renderWeather(data));
    });
}
