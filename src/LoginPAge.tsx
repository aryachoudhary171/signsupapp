
// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { TextInput, Button, Text, HelperText } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { login } from '../src/services/authservice';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Install react-native-vector-icons if not already done

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Please enter a valid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const LoginPage = ({ navigation }: any) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const handleLogin = async (data: { email: string, password: string }) => {
//     try {
//       const response = await login(data);
//       alert('Login Successful');
//       navigation.navigate('Home');
//     } catch (error) {
//       alert(error);
//     }
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
//                 secureTextEntry={!showPassword}
//                 style={styles.input}
//                 error={!!errors.password}
//                 right={
//                   <TextInput.Icon
//                     icon={showPassword ? 'eye-off' : 'eye'}
//                     onPress={() => setShowPassword(!showPassword)}
//                     size={20}
//                     color="blue"
//                   />
//                 }
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
//             Don't have an account?{' '}
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
//     marginTop: 15,
//     textAlign: 'center',
//     color: '#007BFF',
//   },
//   signupContainer: {
//     marginTop: 15,
//     textAlign: 'center',
//   },
//   signupText: {
//     textAlign: 'center',
//   },
//   signupLink: {
//     color: '#007BFF',
//     fontWeight: 'bold',
//   },
// });

// export default LoginPage;


import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../src/services/authservice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Install react-native-vector-icons if not already done

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('red');

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: { email: string, password: string }) => {
    try {
      const response = await login(data);
      setSnackbarMessage('Login Successful');
      setSnackbarColor('green');
      setSnackbarVisible(true);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
    } catch (error) {
      setSnackbarMessage('Login failed. Please try again.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
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
                secureTextEntry={!showPassword}
                style={styles.input}
                error={!!errors.password}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                    size={20}
                    color="blue"
                  />
                }
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
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar for feedback */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        {snackbarMessage}
      </Snackbar>
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
    marginTop: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
  signupContainer: {
    marginTop: 15,
    textAlign: 'center',
  },
  signupText: {
    textAlign: 'center',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginPage;
