import axios from 'axios';
import {Weather} from '../models/Weather';

const API_KEY = '7b0a1cd182c249f0970103005240512'; // Replace with your WeatherAPI key
const BASE_URL = 'https://api.weatherapi.com/v1/';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}current.json`, {
    params: {
      key: API_KEY,
      q: city,
    },
  });
  return response.data as Weather;
};

export const getWeatherByCoords = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}current.json`, {
    params: {
      key: API_KEY,
      q: `${lat},${lon}`,
    },
  });
  return response.data;
};
