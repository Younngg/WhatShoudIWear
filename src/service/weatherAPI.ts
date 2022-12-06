const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const onGeoOk = async (position: any, onUpdate: any) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${API_KEY}`;

  const response = await fetch(url);
  const result = await response.json();

  result && onUpdate(result);
};

const onGeoError = (onError: any) => {
  onError(
    '날씨 및 위치를 불러오지 못했습니다. 위치 액세스가 허용되었는지 확인해주세요.'
  );
};

export const getGeoWeather = (onUpdate: any, onError?: any) => {
  return navigator.geolocation.getCurrentPosition(
    (position) => {
      onGeoOk(position, onUpdate);
    },
    () => {
      onGeoError(onError);
    }
  );
};
