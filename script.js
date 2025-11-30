const apiKey = "8c3f4364e0dde4c6f1b7843868b6afd0"; // <-- nhớ thay API của bạn

document.getElementById("searchBtn").addEventListener("click", searchWeather);
document.getElementById("historyBtn").addEventListener("click", toggleHistory);

// -------------------- SEARCH WEATHER --------------------
function searchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Vui lòng nhập tên thành phố!");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("result").innerHTML = "<p>Không tìm thấy thành phố!</p>";
                return;
            }

            document.getElementById("result").innerHTML = `
                <h3>${data.name}</h3>
                <p>Nhiệt độ: ${data.main.temp}°C</p>
                <p>Thời tiết: ${data.weather[0].description}</p>
            `;

            saveHistory(city);
        })
        .catch(() => {
            document.getElementById("result").innerHTML = "<p>Lỗi API!</p>";
        });
}

// -------------------- SAVE HISTORY --------------------
function saveHistory(city) {
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

    const entry = {
        city,
        time: new Date().toLocaleString()
    };

    history.unshift(entry);
    localStorage.setItem("weatherHistory", JSON.stringify(history));
}

// -------------------- LOAD HISTORY --------------------
function toggleHistory() {
    const box = document.getElementById("historyBox");
    box.style.display = box.style.display === "none" ? "block" : "none";

    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    const box = document.getElementById("historyBox");

    box.innerHTML = "";

    if (history.length === 0) {
        box.innerHTML = "<li>Chưa có lịch sử tìm kiếm!</li>";
        return;
    }

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.city} — ${item.time}`;
        box.appendChild(li);
    });
}

