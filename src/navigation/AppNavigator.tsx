import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {COLORS} from '../utils/constants';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const weather = useSelector((state: RootState) => state.weather);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Details') {
              iconName = 'information-outline';
            } else if (route.name === 'Settings') {
              iconName = 'cog-outline';
            }

            return <Icon name={iconName as any} color={color} size={size} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}>
        {/* Home screen */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Search City',
          }}
        />
        {/* Details screen */}
        {weather && (
          <Tab.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Details',
              headerTitle: 'Weather Details',
            }}
          />
        )}
        {/* Settings screen */}
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
