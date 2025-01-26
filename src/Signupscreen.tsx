
// import React, { useState } from 'react';
// import { View, StyleSheet, Image, ImageBackground } from 'react-native';
// import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { signup } from '../src/services/authservice';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Define the validation schema with Yup
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string()
//     .email('Please enter a valid email address')
//     .test('domain-check', 'Email must be from gmail.com or yahoo.com', (value) => {
//       if (!value) return true; // If value is empty, don't check the domain
//       const allowedDomains = ['gmail.com', 'yahoo.com']; // Define allowed domains
//       const domain = value.split('@')[1]; // Get domain part of email
//       return allowedDomains.includes(domain); // Check if email domain is in allowed domains
//     })
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const SignupScreen = ({ navigation }: any) => {
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarColor, setSnackbarColor] = useState('red');
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const handleSignup = async (data: { name: string; email: string; password: string }) => {
//     try {
//       const response = await signup(data); // Call the signup function
//       setSnackbarMessage('Signup Successful');
//       setSnackbarColor('green');
//       setSnackbarVisible(true); // Show success message

//       // Delay navigation for 3 seconds (duration of Snackbar)
//       setTimeout(() => {
//         navigation.navigate('Login'); // Navigate to the Login page
//       }, 3000);
//     } catch (error) {
//       console.log('Signup error:', error);
//       let errorMessage = 'An unexpected error occurred';
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }
//       setSnackbarMessage(`Error: ${errorMessage}`);
//       setSnackbarColor('red');
//       setSnackbarVisible(true); // Show error message
//     }
//   };

//   const handleGoogleSignup = () => {
//     alert('Sign Up with Google');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top half with background image */}
//       <View style={styles.imageContainer}>
//         <ImageBackground
//           source={require('../assets/patient.png')}
//           style={styles.imageBackground}
//         />
//       </View>

//       {/* Bottom half with signup form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.header}>Sign Up</Text>

//         {/* Name field */}
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

//         {/* Email field */}
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

//         {/* Password field */}
//         <Controller
//           control={control}
//           name="password"
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <View style={styles.passwordContainer}>
//                 <TextInput
//                   label="Password"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   secureTextEntry={!passwordVisible}
//                   style={styles.input}
//                   error={!!errors.password}
//                 />
//                 <Icon
//                   name={passwordVisible ? 'eye-off' : 'eye'}
//                   size={20}
//                   color="blue"
//                   onPress={() => setPasswordVisible(!passwordVisible)}
//                   style={styles.eyeIcon}
//                 />
//               </View>
//               {errors.password && (
//                 <HelperText type="error" visible={!!errors.password}>
//                   {errors.password.message}
//                 </HelperText>
//               )}
//             </>
//           )}
//         />

//         {/* Signup button */}
//         <Button mode="contained" onPress={handleSubmit(handleSignup)} style={styles.button}>
//           Sign Up
//         </Button>

//         {/* Google Sign Up Button */}
//         <View style={styles.googleButtonContainer}>
//           <Button mode="outlined" onPress={handleGoogleSignup} style={styles.googleButton}>
//             <View style={styles.googleButtonContent}>
//               <View style={styles.googleLogoContainer}>
//                 <Image
//                   source={require('../assets/google3.png')} // Ensure correct path for the image
//                   style={styles.googleLogo}
//                 />
//               </View>
//               <Text style={styles.googleButtonText}>Sign up with Google</Text>
//             </View>
//           </Button>
//         </View>

//         {/* Log in link */}
//         <View style={styles.loginLinkContainer}>
//           <Text style={styles.loginText}>
//             Already have an account?{' '}
//             <Text
//               style={styles.loginLink}
//               onPress={() => navigation.navigate('Login')}
//             >
//               Log in
//             </Text>
//           </Text>
//         </View>
//       </View>

//       {/* Snackbar for feedback */}
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={3000}
//         style={{ backgroundColor: snackbarColor }}
//       >
//         {snackbarMessage}
//       </Snackbar>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   imageContainer: {
//     flex: 1,
//   },
//   imageBackground: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
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
//   header: {
//     fontSize: 30,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     marginBottom: 10,
//   },
//   passwordContainer: {
//     position: 'relative',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 15,
//   },
//   button: {
//     marginTop: 20,
//   },
//   googleButtonContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
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
//   googleButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   googleLogo: {
//     width: 24,
//     height: 24,
//   },
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
//   googleButtonText: {
//     color: '#000',
//     fontSize: 16,
//     marginLeft: 10,
//     flex: 1,
//     textAlign: 'left',
//   },
//   loginLinkContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   loginText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   loginLink: {
//     fontSize: 14,
//     color: '#4285F4',
//     textDecorationLine: 'underline',
//   },
// });

// export default SignupScreen;



import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For the stethoscope icon

// Validation schema for email allowing only Gmail and Yahoo
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i,
      'Only Gmail and Yahoo email addresses are allowed'
    )
    .required('Email is required'),
});

const SignupScreen = ({ route, navigation }: any) => {
  const { email } = route?.params || { email: '' };

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('red');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email },
  });

  const handleContinue = (data: { email: string }) => {
    const { email } = data;

    if (email) {
      navigation.navigate('SignupPage', { email });
    } else {
      setSnackbarMessage('Please enter your email address.');
      setSnackbarColor('red');
      setSnackbarVisible(true);
    }
  };

  const handleGoogleSignup = () => {
    alert('Sign Up with Google');
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Back Button and Tab Text */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#081C05" />
        </TouchableOpacity>
        <Text style={styles.tabText}>Create Account</Text>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Icon name="stethoscope" size={60} color="#2f4858" />
        <Text style={styles.logoText}>Patient Centric</Text>
      </View>

      {/* Form Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>We are here to help you!</Text>

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label="Your Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  keyboardType="email-address"
                  error={!!errors.email}
                />
                {errors.email?.message && (
                  <Text style={styles.errorText}>{String(errors.email.message)}</Text>
                )}
              </>
            )}
          />

          {/* Continue Button */}
          <Button
            mode="contained"
            onPress={handleSubmit(handleContinue)}
            style={styles.button}
          >
            Create Account
          </Button>

          {/* Continue with Google */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
            <Image
              source={require('../assets/google3.png')} // Assuming google3.png is in your assets folder
              style={styles.googleImage}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Do you have an account?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Snackbar */}
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
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to align at the top
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Reduced margin to push the header closer to the top
    marginBottom: 20,
    width: '90%',
    paddingTop: 20, // Added padding for spacing
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#081C05',
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#081C05',
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 30,
    width: '90%', // Adjust width to make it fit better
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f4858',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7e7e7e',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2f4858',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  googleImage: {
    width: 28,
    height: 28,
    borderRadius: 12, // This makes the image circular
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#081C05',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#2f4858',
  },
  loginLink: {
    color: '#081C05',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignupScreen;
