// function apiCall(){
//     const obj={
//         lat: 36.3167,
//         lon:74.65 
//     }
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=108deeb3969301a3e5e3c5d5ca2a15a0`)
// .then(data=>data.json())
// .then(data => console.log(data))
// .catch(err => console.log(err))
// }
// apiCall()



const touristDestinations = [
    { name: "Hunza Valley", latitude: 36.3167, longitude: 74.65 },
    { name: "Skardu", latitude: 35.2971, longitude: 75.6333 },
    { name: "Fairy Meadows", latitude: 35.4213, longitude: 74.5969 },
    { name: "Naltar Valley", latitude: 36.1396, longitude: 74.1928 },
    { name: "Murree", latitude: 33.9062, longitude: 73.3903 },
    { name: "Kaghan Valley", latitude: 34.7939, longitude: 73.5793 },
    { name: "Swat Valley", latitude: 35.222, longitude: 72.4258 },
    { name: "Chitral", latitude: 35.851, longitude: 71.7864 },
    { name: "Neelum Valley", latitude: 34.5857, longitude: 73.907 },
    { name: "Ratti Gali Lake", latitude: 34.8861, longitude: 74.0486 },
    { name: "Shangrila Resort", latitude: 35.3525, longitude: 75.5088 },
    { name: "Deosai National Park", latitude: 35.0303, longitude: 75.443 },
    { name: "Khunjerab Pass", latitude: 36.8497, longitude: 75.4306 },
    { name: "Shogran", latitude: 34.6271, longitude: 73.495 },
    { name: "Rama Meadows", latitude: 35.2918, longitude: 74.9643 },
    { name: "Gojal Valley", latitude: 36.6833, longitude: 74.85 },
    { name: "Kalash Valley", latitude: 35.6699, longitude: 71.7309 },
    { name: "Ayubia National Park", latitude: 34.0607, longitude: 73.402 },
    { name: "Saiful Muluk Lake", latitude: 34.8722, longitude: 73.6919 },
    { name: "Khaplu", latitude: 35.1404, longitude: 76.337 },
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
];

document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');

    touristDestinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ latitude: destination.latitude, longitude: destination.longitude });
        option.textContent = destination.name;
        citySelect.appendChild(option);
    });

    document.getElementById('weather-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedOption = citySelect.options[citySelect.selectedIndex].value;
        if (!selectedOption) {
            displayError('Please select a destination');
            return;
        }

        const { latitude, longitude } = JSON.parse(selectedOption);
        const apiKey = '108deeb3969301a3e5e3c5d5ca2a15a0';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    displayError('City not found');
                } else {
                    displayWeather(data);
                }
            })
            .catch(error => displayError('An error occurred while fetching data'));
    });
});

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <div class="weather-data">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} &deg;C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    weatherResult.style.display = 'block';
}

function displayError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<p class="text-danger">${message}</p>`;
    weatherResult.style.display = 'block';
}
