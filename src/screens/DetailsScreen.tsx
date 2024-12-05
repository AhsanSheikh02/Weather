import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Subheading, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {COLORS} from '../utils/constants';

const DetailsScreen = () => {
  const {currentWeather, isLoading, error} = useSelector(
    (state: RootState) => state.weather,
  );

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{currentWeather?.location.name}</Title>
          <Subheading style={styles.subheading}>
            {currentWeather?.location.country}
          </Subheading>
          <View style={styles.weatherInfo}>
            <Text style={styles.infoText}>
              Temperature: {currentWeather?.current.temp_c}°C
            </Text>
            <Text style={styles.infoText}>
              Condition: {currentWeather?.current.condition.text}
            </Text>
            <Text style={styles.infoText}>
              Humidity: {currentWeather?.current.humidity}%
            </Text>
            <Text style={styles.infoText}>
              Wind Speed: {currentWeather?.current.wind_kph} kph
            </Text>
            <Text style={styles.infoText}>
              Local Time: {currentWeather?.location.localtime}
            </Text>
            <Text style={styles.infoText}>
              Last Updated: {currentWeather?.current.last_updated}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#ffffff', // White card for contrast
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b', // Teal color for title
  },
  subheading: {
    fontSize: 18,
    color: '#004d40', // Darker teal for subheading
  },
  weatherInfo: {
    marginTop: 16,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#424242', // Dark gray for text
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#00796b',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export default DetailsScreen;
