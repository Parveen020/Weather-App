document.addEventListener('DOMContentLoaded', function() {
    const firstBox = document.getElementById('firstbox');
    const secondBox = document.getElementById('secondbox');
    const thirdBox = document.getElementById('thirdbox');

    const firstBoxButton = document.getElementById('firstboxbtn');
    const secondboxButton = document.getElementById('secondboxbtn');
    const thirdBoxButton = document.getElementById('backlogo');

    const apiKey = '3fd9f2a71fe514a618348dfcade6ed21';

    firstBoxButton.addEventListener('click', function() {
        firstBox.style.display = 'none';
        firstBox.classList.add('reverseanimation');
        secondBox.style.display = 'flex';
        secondBox.classList.add('animation');
    });

    secondboxButton.addEventListener('click', function() {
        const locationInput = document.getElementById('yourCity');
        if (locationInput.value.trim() === "") {
            alert("Aww, you forgot to fill the city location.");
        } else {
            // Fetch weather data
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Weather Data:', data); // Log the API response
                    // Update third box with weather information
                    updateThirdBox(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again later.');
                });
    
            secondBox.style.display = 'none';
            thirdBox.style.display = 'flex';
            thirdBox.classList.add('animation');
        }
    });
    

    thirdBoxButton.addEventListener('click', function() {
        thirdBox.style.display = 'none';
        secondBox.style.display = 'flex';
        secondBox.classList.add('animation');
    });

    function updateThirdBox(weatherData) {
        const temperatureElement = document.getElementById('temperature');
        const statusElement = document.getElementById('status');
        const placeElement = document.getElementById('place');
        const feelsLikeElement = document.getElementById('feels-like');
        const humidityElement = document.getElementById('humidity');
        const animationElement = document.getElementById('animation');
    
        if (
            weatherData &&
            weatherData.main &&
            weatherData.main.temp !== undefined &&
            weatherData.weather &&
            weatherData.weather[0] &&
            weatherData.weather[0].main !== undefined &&
            weatherData.main.humidity !== undefined &&
            weatherData.name !== undefined &&
            weatherData.sys &&
            weatherData.sys.country !== undefined
        ) {
            const temperature = Math.round(weatherData.main.temp - 273.15); // Convert to Celsius
            console.log((weatherData.main.temp-32)*(5/9));
            const weatherStatus = weatherData.weather[0].main;
            const humidity = weatherData.main.humidity;
            const city = weatherData.name;
            const country = weatherData.sys.country;
    
            temperatureElement.textContent = `${temperature}°C`;
            statusElement.textContent = weatherStatus;
            humidityElement.textContent = `Humidity: ${humidity}%`;
            placeElement.textContent = `${city}, ${country}`;
            feelsLikeElement.textContent = `Feels Like: ${Math.round(weatherData.main.feels_like - 273.15)}°C`;
    
            // Adjust the animation based on weather conditions
            if (weatherStatus.toLowerCase().includes('cloud')) {
                animationElement.innerHTML = '<video src="cloudy.mp4" autoplay loop></video>';
            } else if (weatherStatus.toLowerCase().includes('rain')) {
                animationElement.innerHTML = '<video src="rainy.mp4" autoplay loop></video>';
            } else if (weatherStatus.toLowerCase().includes('mist')) {
                animationElement.innerHTML = '<video src="drizzle.mp4" autoplay loop></video>';
            } else if (weatherStatus.toLowerCase().includes('smoke') || weatherStatus.toLowerCase().includes('fog')) {
                animationElement.innerHTML = '<video src="foggy.mp4" autoplay loop></video>';
            }else if (weatherStatus.toLowerCase().includes('clear') || weatherStatus.toLowerCase().includes('sunny')) {
                animationElement.innerHTML = '<video src="sun.mp4" autoplay loop></video>';
            }else if (weatherStatus.toLowerCase().includes('haze')) {
                animationElement.innerHTML = '<video src="sun (1).mp4" autoplay loop></video>';
            } else {
                // Default animation for other conditions
                animationElement.innerHTML = '<video src="default-animation.mp4" autoplay loop></video>';
            }
        } else {
            console.error('Invalid weather data format:', weatherData);
            alert('Error processing weather data. Please try again later.');
        }
    }
    
});
