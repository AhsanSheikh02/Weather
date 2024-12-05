import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from '../redux/slices/weatherSlice';
import {AppDispatch, RootState} from '../redux/store';
import {COLORS} from '../utils/constants';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, currentWeather, error, unit} = useSelector(
    (state: RootState) => state.weather,
  );

  const handleSearch = () => {
    if (city.trim() === '') {
      Alert.alert('Validation', 'Please enter a city name.');
      return;
    }
    dispatch(fetchWeatherByCity(city) as any);
  };

  const handleFetchByLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(fetchWeatherByCoords({lat: latitude, lon: longitude}) as any);
      },
      error => Alert.alert('Error', 'Unable to retrieve location.'),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSearch} style={styles.button}>
        Search Weather
      </Button>
      <Button
        mode="outlined"
        onPress={handleFetchByLocation}
        style={styles.button}>
        Use My Location
      </Button>

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {currentWeather && (
        <View style={styles.weatherDetails}>
          <Text style={styles.cityName}>{currentWeather.location.name}</Text>
          <Text style={styles.temperature}>
            Temperature:{' '}
            {unit === 'fahrenheit'
              ? currentWeather.current.temp_f
              : currentWeather.current.temp_c}
            °{unit === 'fahrenheit' ? 'F' : 'C'}
          </Text>
          <Text style={styles.condition}>
            Weather: {currentWeather.current.condition.text}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  button: {
    marginBottom: 16,
  },
  loader: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginVertical: 16,
  },
  weatherDetails: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  temperature: {
    fontSize: 20,
    color: '#ff5722',
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
