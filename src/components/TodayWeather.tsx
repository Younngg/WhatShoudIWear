import React, { useEffect, useState } from 'react';
import { getGeoWeather } from '../service/weatherAPI';
import useClothes from '../hooks/useClothes';

const TodayWeather = ({ isLoading }: { isLoading: boolean }) => {
  const date = new Date();
  const [weather, setWeather] = useState({
    temp: 0,
    feels_like: 0,
    weather: '',
    place: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const clothes = useClothes(weather.temp);

  useEffect(() => {
    getGeoWeather(
      (data: any) => {
        setWeather({
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          weather: data.weather[0].description,
          place: data.name,
        });
      },
      (err: any) => {
        setErrorMessage(err);
      }
    );
  }, []);

  return (
    <div className='mb-5 flex  relative w-full px-8 py-5 gap-10 bg-sky-100 rounded-xl'>
      <div className=''>
        <p className='text-xl font-semibold'>
          {date.toLocaleDateString('ko-kr')}
        </p>
        <p>위치 : {weather.place}</p>
        <div className='flex items-center justify-between gap-3 mt-2'>
          <p className='text-2xl font-bold'>{weather.temp}°</p>
          <div>
            <p>{weather.weather}</p>
            <p>체감 {weather.feels_like}°</p>
          </div>
        </div>
      </div>
      <div>
        <p className='text-xl font-semibold mb-2'>오늘 추천하는 옷은...</p>
        <p>
          {errorMessage || !weather.weather ? (
            <span>{errorMessage}</span>
          ) : (
            <span>{clothes}</span>
          )}
        </p>
      </div>
      <span className='absolute right-4 bottom-2 text-sm text-blue-500'>
        * 날씨나 위치가 정확하지 않을 수 있습니다.
      </span>
    </div>
  );
};

export default TodayWeather;
