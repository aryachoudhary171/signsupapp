// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/HomeScreen';
// import SignupScreen from './src/Signupscreen';
// import SignupPage from './src/SignupPage';
// import VerifyEmailScreen from './src/VerifyEmailScreen';
// import LoginScreen from './src/LoginPAge';
// import DashboardWithDrawer from './src/Dashboard'; // Import the Dashboard component with Drawer integration

// export type RootStackParamList = {
//   Home: undefined;
//   SignupScreen: undefined;
//   SignupPage: undefined;
//   VerifyEmailScreen: undefined;
//   Login: undefined;
//   Dashboard: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         <Stack.Screen name="SignupPage" component={SignupPage} />
//         <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Dashboard" component={DashboardWithDrawer} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/HomeScreen';
// import SignupScreen from './src/Signupscreen';
// import SignupPage from './src/SignupPage';
// import VerifyEmailScreen from './src/VerifyEmailScreen';
// import LoginScreen from './src/LoginPAge';
// import DashboardWithDrawer from './src/Dashboard'; // Import the Dashboard component with Drawer integration
// import AddAppointment from './src/addAppointment'; // Import AddAppointment screen
// import BookAppointment from './src/BookAppointment'; // Import BookAppointment screen

// export type RootStackParamList = {
//   Home: undefined;
//   SignupScreen: undefined;
//   SignupPage: undefined;
//   VerifyEmailScreen: undefined;
//   Login: undefined;
//   Dashboard: undefined;
//   AddAppointment: undefined;
//   BookAppointment: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check if the user is logged in (this could be based on your app's authentication state)
//   useEffect(() => {
//     // Logic to check user login status (e.g., using AsyncStorage, Redux, or a backend check)
//     const checkLoginStatus = async () => {
//       // For demo purposes, let's assume they are logged in after 2 seconds
//       setTimeout(() => {
//         setIsLoggedIn(true); // Change this based on real authentication state
//       }, 2000);
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {/* Always show these screens in order */}
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         <Stack.Screen name="SignupPage" component={SignupPage} />
//         <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />

//         {/* Only show these screens after login */}
//         {isLoggedIn && (
//           <>
//             <Stack.Screen name="Dashboard" component={DashboardWithDrawer} />
//             <Stack.Screen name="AddAppointment" component={AddAppointment} />
//             <Stack.Screen name="BookAppointment" component={BookAppointment} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/HomeScreen';
// import SignupScreen from './src/Signupscreen';
// import SignupPage from './src/SignupPage';
// import VerifyEmailScreen from './src/VerifyEmailScreen';
// import LoginScreen from './src/LoginPAge';
// import DashboardWithDrawer from './src/Dashboard'; // Dashboard with Drawer
// import AddAppointment from './src/addAppointment';
// import BookAppointment from './src/BookAppointment';
// import ProfileScreen from './src/Profile';

// export type RootStackParamList = {
//   Home: undefined;
//   SignupScreen: undefined;
//   SignupPage: undefined;
//   VerifyEmailScreen: undefined;
//   Login: undefined;
//   Dashboard: undefined;
//   AddAppointment: undefined;
//   ProfileScreen: undefined;
//   BookAppointment: { addAppointment: (appointment: any) => void } | undefined; // Updated to reflect addAppointment function
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {/* Always show the following screens */}
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         <Stack.Screen name="SignupPage" component={SignupPage} />
//         <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
        
//         {/* Add these screens only when navigating */}
//         <Stack.Screen name="Dashboard" component={DashboardWithDrawer} />
//         <Stack.Screen name="AddAppointment" component={AddAppointment} />
//         <Stack.Screen name="BookAppointment" component={BookAppointment} />
//         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import SignupScreen from './src/Signupscreen';
import SignupPage from './src/SignupPage';
import VerifyEmailScreen from './src/VerifyEmailScreen';
import LoginScreen from './src/LoginPAge';
import DashboardWithDrawer from './src/Dashboard'; // Dashboard with Drawer
import AddAppointment from './src/addAppointment';
import BookAppointment from './src/BookAppointment';
import ProfileScreen from './src/Profile';

export type Appointment = {
  id: string;
  doctor: string;
  date: string;
  time: string;
  hospital: string;
  reason: string;
  name: string;
  contact: string;
};

export type RootStackParamList = {
  Home: undefined;
  SignupScreen: undefined;
  SignupPage: undefined;
  VerifyEmailScreen: undefined;
  Login: undefined;
  Dashboard: undefined;
  AddAppointment: { newAppointment?: Appointment } | undefined; // Allows passing new appointment details
  ProfileScreen: undefined;
  BookAppointment: undefined; // No params required for this screen
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Core screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Dynamic navigation screens */}
        <Stack.Screen name="Dashboard" component={DashboardWithDrawer} />
        <Stack.Screen name="AddAppointment" component={AddAppointment} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
