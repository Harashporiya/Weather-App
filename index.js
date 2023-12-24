class Weather {
    constructor(city, temp, feels_like, humidity, wind) {
        this.city = city;
        this.temp = temp;
        this.feels_like = feels_like;
        this.humidity = humidity;
        this.wind = wind;
    }

    displayDetails() {
        const weatherDetails = `
        <p>name: ${this.city}</p>
        <p>Temperature: ${this.temp}°C</p>
        <p>Feels Like: ${this.feels_like}°C</p>
        <p>Humidity: ${this.humidity}%</p>
        <p>Wind: ${this.wind} m/s</p>`;

        document.getElementById('box').innerHTML = weatherDetails;

        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weather-item');
        weatherDiv.innerHTML = weatherDetails;
        //document.getElementById('weather_app').appendChild(weatherDiv);
    }
}

const box = document.getElementById('box');
box.style.display = 'none';

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', async function () {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput.trim() !== '') {
        const apiKey = '725ce78d018f542d22bc4601873b8bc5';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            const { name, main, wind } = data;
            const weatherInstance = new Weather(name, main.temp, main.feels_like, main.humidity, wind.speed);
            weatherInstance.displayDetails();
            box.style.display = 'block';
        } catch (error) {
            alert('There was a problem fetching the weather data:', error);
        }
    } else {
        alert('Please enter a city name.');
    }
});
