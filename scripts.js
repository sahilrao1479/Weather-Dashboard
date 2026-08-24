
const btn = document.getElementById("search-btn");
const inputbox = document.getElementById("cityname");

const city = document.getElementById("city");
const country = document.getElementById("countrycode");
const weather = document.getElementById("wdesc");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wspeed");

const output = document.getElementById("output");
const loading = document.getElementById("loading");

// ==========================
// OpenWeather API Key
// ==========================

const API_KEY = ""

// ==========================
// Display Weather Data
// ==========================

function renderData(data) {

    city.textContent = `📍 City : ${data.name}`;
    country.textContent = `🌍 Country : ${data.sys.country}`;
    weather.textContent = `☁ Weather : ${data.weather[0].description}`;
    temp.textContent = `🌡 Temperature : ${Math.round(data.main.temp)} °C`;
    humidity.textContent = `💧 Humidity : ${data.main.humidity}%`;
    wind.textContent = `💨 Wind Speed : ${data.wind.speed} m/s`;

    output.classList.remove("hidden");
}

// ==========================
// Fetch Weather
// ==========================

async function getWeather() {

    const cityName = inputbox.value.trim();

    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }

    loading.classList.remove("hidden");
    output.classList.add("hidden");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        renderData(data);

        inputbox.value = "";

    } catch (error) {

        alert(error.message);

    } finally {

        loading.classList.add("hidden");

    }
}

// ==========================
// Events
// ==========================

// Search Button
btn.addEventListener("click", getWeather);

// Enter Key
inputbox.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

});