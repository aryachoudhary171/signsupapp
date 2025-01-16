// import React, { useState } from 'react';
// import { View, StyleSheet, Image, ImageBackground } from 'react-native';
// import { TextInput, Button, Text, HelperText } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { signup } from '../src/services/authservice';

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string()
//     .email('Please enter a valid email address')
//     .test('domain-check', 'Email must be from gmail.com or yahoo.com', (value) => {
//       if (!value) return true;
//       const allowedDomains = ['gmail.com', 'yahoo.com'];
//       const domain = value.split('@')[1];
//       return allowedDomains.includes(domain);
//     })
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const SignupScreen = ({ navigation }: any) => {
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const handleSignup = async (data: { name: string; email: string; password: string }) => {
//     try {
//       const response = await signup(data);
//       alert('Signup Successful');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.log('Signup error:', error);
//       let errorMessage = 'An unexpected error occurred';

//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else if (typeof error === 'object' && error !== null && 'message' in error) {
//         errorMessage = (error as { message: string }).message;
//       } else if (typeof error === 'string') {
//         errorMessage = error;
//       }

//       alert(`Error: ${errorMessage}`);
//     }
//   };

//   const handleGoogleSignup = () => {
//     alert('Sign Up with Google');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageBackground source={require('../assets/patient.png')} style={styles.imageBackground} />
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.header}>Sign Up</Text>

//         <Controller
//           control={control}
//           name="name"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <TextInput
//                 label="Name"
//                 value={value}
//                 onChangeText={onChange}
//                 onBlur={onBlur}
//                 style={styles.input}
//                 error={!!errors.name}
//               />
//               {errors.name && (
//                 <HelperText type="error" visible={!!errors.name}>
//                   {errors.name.message}
//                 </HelperText>
//               )}
//             </>
//           )}
//         />

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

//         <Button mode="contained" onPress={handleSubmit(handleSignup)} style={styles.button}>
//           Sign Up
//         </Button>

//         <View style={styles.googleButtonContainer}>
//           <Button mode="outlined" onPress={handleGoogleSignup} style={styles.googleButton}>
//             <View style={styles.googleButtonContent}>
//               <View style={styles.googleLogoContainer}>
//                 <Image source={require('../assets/google3.png')} style={styles.googleLogo} />
//               </View>
//               <Text style={styles.googleButtonText}>Sign up with Google</Text>
//             </View>
//           </Button>
//         </View>

//         <View style={styles.loginLinkContainer}>
//           <Text style={styles.loginText}>
//             Already have an account?{' '}
//             <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
//               Log in
//             </Text>
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   imageContainer: { flex: 1 },
//   imageBackground: { flex: 1, resizeMode: 'cover' },
//   formContainer: {
//     flex: 2,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     width: '100%',
//     elevation: 5,
//   },
//   header: { fontSize: 30, marginBottom: 20, textAlign: 'center' },
//   input: { marginBottom: 10 },
//   button: { marginTop: 20 },
//   googleButtonContainer: { marginTop: 20, alignItems: 'center' },
//   googleButton: {
//     paddingHorizontal: 10,
//     width: '100%',
//     paddingVertical: 1,
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#4285F4',
//     alignSelf: 'center',
//   },
//   googleButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
//   googleLogo: { width: 24, height: 24 },
//   googleLogoContainer: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 30,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   googleButtonText: { color: '#000', fontSize: 16, marginLeft: 10, flex: 1, textAlign: 'left' },
//   loginLinkContainer: { marginTop: 20, alignItems: 'center' },
//   loginText: { fontSize: 14, color: '#000' },
//   loginLink: { fontSize: 14, color: '#4285F4', textDecorationLine: 'underline' },
// });

// export default SignupScreen;
import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signup } from '../src/services/authservice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .test('domain-check', 'Email must be from gmail.com or yahoo.com', (value) => {
      if (!value) return true; // If value is empty, don't check the domain
      const allowedDomains = ['gmail.com', 'yahoo.com']; // Define allowed domains
      const domain = value.split('@')[1]; // Get domain part of email
      return allowedDomains.includes(domain); // Check if email domain is in allowed domains
    })
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignupScreen = ({ navigation }: any) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('red');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignup = async (data: { name: string; email: string; password: string }) => {
    try {
      const response = await signup(data); // Call the signup function
      setSnackbarMessage('Signup Successful');
      setSnackbarColor('green');
      setSnackbarVisible(true); // Show success message

      // Delay navigation for 3 seconds (duration of Snackbar)
      setTimeout(() => {
        navigation.navigate('Login'); // Navigate to the Login page
      }, 3000);
    } catch (error) {
      console.log('Signup error:', error);
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setSnackbarMessage(`Error: ${errorMessage}`);
      setSnackbarColor('red');
      setSnackbarVisible(true); // Show error message
    }
  };

  const handleGoogleSignup = () => {
    alert('Sign Up with Google');
  };

  return (
    <View style={styles.container}>
      {/* Top half with background image */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../assets/patient.png')}
          style={styles.imageBackground}
        />
      </View>

      {/* Bottom half with signup form */}
      <View style={styles.formContainer}>
        <Text style={styles.header}>Sign Up</Text>

        {/* Name field */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                error={!!errors.name}
              />
              {errors.name && (
                <HelperText type="error" visible={!!errors.name}>
                  {errors.name.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Email field */}
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

        {/* Password field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!passwordVisible}
                  style={styles.input}
                  error={!!errors.password}
                />
                <Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="blue"
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                />
              </View>
              {errors.password && (
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Signup button */}
        <Button mode="contained" onPress={handleSubmit(handleSignup)} style={styles.button}>
          Sign Up
        </Button>

        {/* Google Sign Up Button */}
        <View style={styles.googleButtonContainer}>
          <Button mode="outlined" onPress={handleGoogleSignup} style={styles.googleButton}>
            <View style={styles.googleButtonContent}>
              <View style={styles.googleLogoContainer}>
                <Image
                  source={require('../assets/google3.png')} // Ensure correct path for the image
                  style={styles.googleLogo}
                />
              </View>
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </View>
          </Button>
        </View>

        {/* Log in link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Log in
            </Text>
          </Text>
        </View>
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
  imageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 2,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    marginTop: 20,
  },
  googleButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  googleButton: {
    paddingHorizontal: 10,
    width: '100%',
    paddingVertical: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4285F4',
    alignSelf: 'center',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  googleLogoContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    textAlign: 'left',
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
    fontSize: 14,
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
