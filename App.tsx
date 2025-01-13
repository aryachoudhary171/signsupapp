
// import React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Import your screen components
// import HomePage from './src/HomePage';
// import ViewAppointment from './src/ViewAppointment';
// import EditAppointment from './src/EditAppointment';
// import BookAppointment from './src/BookAppointment';
// import LoginPage from './src/LoginPAge'; // Corrected import
// import SignupScreen from './src/Signupscreen'; // Correct import

// // Define the types for the stack navigator's screen parameters
// type RootStackParamList = {
//   Login: undefined;              // No parameters for Login screen
//   Signup: undefined;             // No parameters for Signup screen
//   Home: undefined;               // No parameters for Home screen
//   ViewAppointment: undefined;    // No parameters for ViewAppointment screen
//   EditAppointment: undefined;    // No parameters for EditAppointment screen
//   BookAppointment: undefined;    // No parameters for BookAppointment screen
// };

// // Create the stack navigator with the type
// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           {/* Authentication Screens */}
//           <Stack.Screen 
//             name="Login" 
//             component={LoginPage} 
//             options={{ title: 'Login' }} 
//           />
//           <Stack.Screen 
//             name="Signup" 
//             component={SignupScreen} 
//             options={{ title: 'Sign Up' }} 
//           />
          
//           {/* Appointment Management Screens */}
//           <Stack.Screen 
//             name="Home" 
//             component={HomePage} 
//             options={{ title: 'Home' }} 
//           />
//           <Stack.Screen 
//             name="ViewAppointment" 
//             component={ViewAppointment} 
//             options={{ title: 'View Appointment' }} 
//           />
//           <Stack.Screen 
//             name="EditAppointment" 
//             component={EditAppointment} 
//             options={{ title: 'Edit Appointment' }} 
//           />
//           <Stack.Screen 
//             name="BookAppointment" 
//             component={BookAppointment} 
//             options={{ title: 'Book Appointment' }} 
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default App;


import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import HomePage from './src/HomePage';
import ViewAppointment from './src/ViewAppointment';
import EditAppointment from './src/EditAppointment';
import BookAppointment from './src/BookAppointment';
import LoginPage from './src/LoginPAge'; // Corrected import
import SignupScreen from './src/Signupscreen'; // Correct import


// Define the types for the stack navigator's screen parameters
type RootStackParamList = {
  Login: undefined;              // No parameters for Login screen
  Signup: undefined;             // No parameters for Signup screen
  Home: undefined;               // No parameters for Home screen
  ViewAppointment: undefined;    // No parameters for ViewAppointment screen
  EditAppointment: undefined;    // No parameters for EditAppointment screen
  BookAppointment: undefined; 


};

// Create the stack navigator with the type
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Authentication Screens */}
          <Stack.Screen 
            name="Login" 
            component={LoginPage} 
            options={{ title: 'Login' }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ title: 'Sign Up' }} 
          />
          
          {/* Appointment Management Screens */}
          <Stack.Screen 
            name="Home" 
            component={HomePage} 
            options={{ title: 'Home' }} 
          />
          <Stack.Screen 
            name="ViewAppointment" 
            component={ViewAppointment} 
            options={{ title: 'View Appointment' }} 
          />
          <Stack.Screen 
            name="EditAppointment" 
            component={EditAppointment} 
            options={{ title: 'Edit Appointment' }} 
          />
          <Stack.Screen 
            name="BookAppointment" 
            component={BookAppointment} 
            options={{ title: 'Book Appointment' }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

