# Weather

A React Native app to fetch weather information for a city or the user's current location.

## Features

- Search weather by city.
- Use current location for weather data.
- View detailed weather stats.
- Toggle between Celsius and Fahrenheit.
- Persistent state management with Redux and Redux-Persist.
- Error handling for API requests and permissions.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- React Native CLI installed.
- API key from [OpenWeatherMap](https://weatherapi.com/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AhsanSheikh02/Weather.git
   cd Weather
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npx react-native run-android
   ```

   ```bash
   npx react-native run-ios
   ```

   Note: Make sure you have an Android emulator running (e.g., using Android Studio) or an iOS simulator running (e.g., using Xcode).

## Note

- This app uses the free tier of the OpenWeatherMap API, which has a limit of 1000 requests per day. If you need more requests, consider upgrading to a paid plan (you can replace the API key in the `src/api/weatherApi.ts` file with your own).

- The app uses the `react-native-vector-icons` package to display weather icons. Make sure to run `npm install` after cloning the repository to install the necessary font files.
