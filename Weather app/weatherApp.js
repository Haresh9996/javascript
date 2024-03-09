
// const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465',
    //         'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    //     }
    // };

window.addEventListener('load', ()=>{
    let cityName = "junagadh"
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    }
    makeWeatherApp(url, options, cityName)
})

async function makeWeatherApp(url, options, city) {

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
        const result = await response.json();
        console.log(result)

        document.querySelector(".city-name").textContent = city;
        document.querySelector(".temp").textContent = result.temp + "°C";
        document.querySelector("#location").innerText = city;
        document.querySelector("#humidity").innerText = result.humidity;
        document.querySelector("#wind").innerText = result.wind_speed;

        document.querySelector(".cloud").innerText = result.cloud_pct + "%";
        document.querySelector(".feels").innerText = result.feels_like + " deg";
        document.querySelector(".humidity").innerText = result.humidity +" %";
        document.querySelector(".maxtemp").innerText = result.max_temp + " °C";
        document.querySelector(".mintemp").innerText = result.min_temp + " °C";
        document.querySelector(".sunrise").innerText = result.sunrise;
        document.querySelector(".sunset").innerText = result.sunset;
        document.querySelector(".temp2").innerText = result.temp + " °C";
        document.querySelector(".winddeg").innerText = result.wind_degrees;
        document.querySelector(".windspeed").innerText = result.wind_speed;

    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data. Please try again later.', error);
    } finally{

        document.querySelector(".animation").style.display = "none";
        document.querySelector(".weather-data").style.display = "block";
        document.getElementById("submit").disabled = false;
        let cities = data.map(city => city.name);
        let datalist = document.getElementById('cities');
        cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    }
}

let idofInt = setInterval(()=>{
    alert('please Enter city name.')
}, 10000)

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    
    document.querySelector(".animation").style.display = "block"; 
    document.querySelector(".weather-data").style.display = "none";

    document.getElementById("submit").disabled = true;
    let cityName = document.querySelector("#search").value;

    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c1742548b5msh758b7b081d583f2p1e3a93jsn3e27a39a2465',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    makeWeatherApp(url, options, cityName);
    clearInterval(idofInt);
    
})

