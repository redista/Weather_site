const API_KEY = "0c8b3d1877a4b131ac3c19092b791b22";
const base_url = "http://api.openweathermap.org/data/2.5/weather";


var city_in = "a";    // City input, also serves as latitude input
var country_in = "a"; // Country input, also serves as Longtitude input

function parse_in() {
	var loc = document.getElementById("manual-box-input").value;
	console.log(loc);
	loc = loc.split(/(?:,| )+/);
	city_in = loc[0];
	country_in = loc[1];
	console.log(city_in);
}

function call_API() {
	try {
		parse_in();
		console.log(city_in, country_in);
		let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city_in + "," + country_in + "&appid=" + API_KEY;
		console.log(url);
		fetch(url)
		.then((resp) => resp.json())
		.then(function(data) {
			console.log(data);
			document.getElementById("location").innerHTML = data.name + ", " + data.sys.country;
			document.getElementById('main-weather').innerHTML = "Weather: " + data.weather[0].main;
			document.getElementById('weather-desc').innerHTML = "Description: " + data.weather[0].description;
			document.getElementById('temp').innerHTML = "Temperature: " + Math.round(data.main.temp - 273.15) + "&#176;C";
		})
	}
	catch(err) {
		console.error(err);
	}
}

