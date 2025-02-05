document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".ri-search-line");
    const inputField = document.getElementById("wether");

    searchIcon.addEventListener("click", fetchWeather);

    function fetchWeather() {
        const apiKey = "3b677b24b6e9f6fd114e6d4b9962e468";
        const city = inputField.value.trim();

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    alert("City not found....!");
                    return;
                }

                displayWeather(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("Please try again.");
            });
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById("weather-result");
        if (!weatherContainer) {
            const newDiv = document.createElement("div");
            newDiv.id = "weather-result";
            document.querySelector("main").appendChild(newDiv);
        }

        document.getElementById("weather-result").innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <h3>${data.weather[0].description}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    }
});
