const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const onGeoOk = async (position: any, onUpdate: any) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();

  result && onUpdate(result);
};

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

export const getGeoWeather = (onUpdate: any) => {
  return navigator.geolocation.getCurrentPosition((position) => {
    onGeoOk(position, onUpdate);
  }, onGeoError);
};
