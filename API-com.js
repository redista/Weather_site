const API_KEY_OW = "";
const base_url = "https://api.openweathermap.org/data/2.5/forecast";


var city_in = "a";    // City input, also serves as latitude input
var country_in = "a"; // Country input, also serves as Longitude input
var input = document.getElementById('manual-box-input');

input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById('manual-box-submit').click();
	}
})

function convert_unix_time(unix_time) {
  var a = new Date(unix_time * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = days[a.getDay()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = day + ", " + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + '0';
  return time;
}


function parse_in() {
	var loc = document.getElementById("manual-box-input").value;
	loc = loc.split(/(?:,| )+/);
	city_in = loc[0];
	country_in = loc[1];
	let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city_in + "," + country_in + "&appid=" + API_KEY_OW;
	call_API(url);
	document.getElementById("manual-box-input").value = "";
}

function geo_locate_success(pos) {
	city_in = Math.round(pos.coords.latitude);
	country_in = Math.round(pos.coords.longitude);
	let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + city_in + "&lon=" + country_in + "&appid=" + API_KEY_OW;
	call_API(url);
}

function detect_geo_locate() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maxiumAge: 0
	};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geo_locate_success, geo_locate_error, options);
	}
	function geo_locate_error(err) {
		alert("Browser does not support Geolocation");
	}
}

function call_API(url) {
	try {
		fetch(url)
		.then((resp) => resp.json())
		.then(function(data) {
			console.log(data);

			parentparentElement = document.getElementById('weather-result');

			while (parentparentElement.firstChild) {
				parentparentElement.removeChild(parentparentElement.firstChild);
			}

			var i;
			var days_hours = 8; // 1 for the 3 hour forecast, 4 for the half-daily forecast, 8 for the daily forecast

			for (i = 0; i < data.list.length; i = i + days_hours) {
				//Creating elements
				parentElement_c = document.createElement('div');
				parentElement = parentparentElement.appendChild(parentElement_c);


				var dt_ele = document.createElement('p');
				var location_ele = document.createElement('p');
				var main_weather_ele = document.createElement('p');
				var weather_desc_ele = document.createElement('p');
				var temp_ele = document.createElement('p');
				//var w_break = document.createElement('br');

				var dt_ele_app = parentElement.appendChild(dt_ele);
				var location_ele_app = parentElement.appendChild(location_ele);
				var main_weather_ele_app = parentElement.appendChild(main_weather_ele);
				var weather_desc_ele_app = parentElement.appendChild(weather_desc_ele);
				var temp_ele_app = parentElement.appendChild(temp_ele);
				//parentElement.appendChild(w_break);


				//Adding the info to the html
				dt_ele_app.innerHTML = convert_unix_time(data.list[i].dt);
				location_ele_app.innerHTML = data.city.name + ", " + data.city.country;
				main_weather_ele_app.innerHTML = "Weather: " + data.list[i].weather[0].main;
				weather_desc_ele_app.innerHTML = "Description: " + data.list[i].weather[0].description;
				temp_ele_app.innerHTML = "Temperature: " + Math.round(data.list[i].main.temp - 273.15) + "&#176;C";
			}
		})
	}
	catch(err) {
		console.error(err);
	}
}

