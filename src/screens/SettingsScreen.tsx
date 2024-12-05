import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setUnit} from '../redux/slices/weatherSlice';
import {RootState} from '../redux/store';
import {COLORS} from '../utils/constants';

const SettingsScreen = () => {
  const unit = useSelector((state: RootState) => state.weather.unit);
  const dispatch = useDispatch();

  const toggleUnit = () => {
    dispatch(setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Use {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
      </Text>
      <Switch value={unit === 'fahrenheit'} onValueChange={toggleUnit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SettingsScreen;
