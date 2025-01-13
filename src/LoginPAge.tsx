// import React from 'react';
// import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { TextInput, Button, Text, HelperText } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// // Define the validation schema with Yup
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Please enter a valid email address') 
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// type Props = {
//   navigation: any; // Ensure this is passed in correctly
// };

// const LoginPage = ({ navigation }: Props) => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const handleLogin = (data: { email: string, password: string }) => {
//     alert('Login Successful');
//     // Navigate to Home page on successful login
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('../assets/patient.png')}
//         style={styles.imageBackground}
//         resizeMode="cover"
//       />
//       <View style={styles.loginContainer}>
//         <Text style={styles.header}>Login</Text>

//         <Controller
//           control={control}
//           name="email"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <TextInput
//                 label="Email"
//                 value={value}
//                 onChangeText={onChange}
//                 onBlur={onBlur}
//                 style={styles.input}
//                 keyboardType="email-address"
//                 error={!!errors.email}
//               />
//               {errors.email && (
//                 <HelperText type="error" visible={!!errors.email}>
//                   {errors.email.message}
//                 </HelperText>
//               )}
//             </>
//           )}
//         />

//         <Controller
//           control={control}
//           name="password"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <TextInput
//                 label="Password"
//                 value={value}
//                 onChangeText={onChange}
//                 onBlur={onBlur}
//                 secureTextEntry
//                 style={styles.input}
//                 error={!!errors.password}
//               />
//               {errors.password && (
//                 <HelperText type="error" visible={!!errors.password}>
//                   {errors.password.message}
//                 </HelperText>
//               )}
//             </>
//           )}
//         />

//         <Button mode="contained" onPress={handleSubmit(handleLogin)} style={styles.button}>
//           Log In
//         </Button>

//         <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//           <Text style={styles.forgotPassword}>Forgot your password?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupContainer}>
//           <Text style={styles.signupText}>
//             Don't you have an account?{' '}
//             <Text style={styles.signupLink}>Sign up</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   imageBackground: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   loginContainer: {
//     flex: 2,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     width: '97%',
//     elevation: 5,
//   },
//   header: {
//     fontSize: 30,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   button: {
//     marginTop: 20,
//   },
//   forgotPassword: {
//     marginTop: 10,
//     color: 'blue',
//     textAlign: 'center',
//   },
//   signupContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   signupText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   signupLink: {
//     color: 'blue',
//     fontWeight: 'bold',
//   },
// });

// export default LoginPage;
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../src/services/authservice'; // Make sure the import path is correct

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type Props = {
  navigation: any; // Ensure this is passed in correctly
};

const LoginPage = ({ navigation }: Props) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: { email: string, password: string }) => {
    try {
      const response = await login(data);
      if (response.success) {
        alert('Login Successful');
        navigation.navigate('Home');
      } else {
        alert('Login Failed: ' + response.message);
      }
    } catch (error) {
      // Type assertion to treat error as 'any'
      const e = error as any;  // Tell TypeScript that 'error' is of type 'any'
      console.log("Login error: ", e);  // Log the entire error object to inspect its structure
      let errorMessage = 'An unexpected error occurred';
      if (e && typeof e === 'object' && e.message) {
        errorMessage = e.message;  // Use the 'message' property if it exists
      }
      alert('Error: ' + errorMessage);
    }
  };
      return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/patient.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Login</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                keyboardType="email-address"
                error={!!errors.email}
              />
              {errors.email && (
                <HelperText type="error" visible={!!errors.email}>
                  {errors.email.message}
                </HelperText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                style={styles.input}
                error={!!errors.password}
              />
              {errors.password && (
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password.message}
                </HelperText>
              )}
            </>
          )}
        />

        <Button mode="contained" onPress={handleSubmit(handleLogin)} style={styles.button}>
          Log In
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't you have an account?{' '}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginContainer: {
    flex: 2,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '97%',
    elevation: 5,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#000',
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginPage;