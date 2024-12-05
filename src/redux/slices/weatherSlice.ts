import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getWeatherByCity, getWeatherByCoords} from '../../api/weatherApi';
import {Weather} from '../../models/Weather';

interface WeatherState {
  unit: 'celsius' | 'fahrenheit';
  currentWeather: Weather;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  unit: 'celsius',
  currentWeather: null!,
  isLoading: false,
  error: null,
};

// Async Thunk for fetching weather by city
export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city: string, {rejectWithValue}) => {
    try {
      const response = await getWeatherByCity(city);
      return response as Weather;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred',
      );
    }
  },
);

// Async Thunk for fetching weather by coordinates
export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async (coords: {lat: number; lon: number}, {rejectWithValue}) => {
    try {
      const response = await getWeatherByCoords(coords.lat, coords.lon);
      return response as Weather;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred',
      );
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit(state, action: PayloadAction<'celsius' | 'fahrenheit'>) {
      state.unit = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherByCity.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWeatherByCoords.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const {setUnit} = weatherSlice.actions;

const weatherReducer = weatherSlice.reducer;

export default weatherReducer;
