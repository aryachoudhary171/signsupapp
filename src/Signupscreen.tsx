





// // import React from 'react';
// // import { View, StyleSheet, Image, ImageBackground } from 'react-native';
// // import { TextInput, Button, Text, HelperText } from 'react-native-paper';
// // import { useForm, Controller } from 'react-hook-form';
// // import * as Yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup';

// // // Define the validation schema with Yup
// // const validationSchema = Yup.object().shape({
// //   name: Yup.string().required('Name is required'),
// //   email: Yup.string()
// //     .email('Please enter a valid email address')
// //     .test('domain-check', 'Email must be from gmail.com or yahoo.com', (value) => {
// //       if (!value) return true; // If value is empty, don't check the domain
// //       const allowedDomains = ['gmail.com', 'yahoo.com']; // Define allowed domains
// //       const domain = value.split('@')[1]; // Get domain part of email
// //       return allowedDomains.includes(domain); // Check if email domain is in allowed domains
// //     })
// //     .required('Email is required'),
// //   password: Yup.string()
// //     .min(6, 'Password must be at least 6 characters')
// //     .required('Password is required'),
// // });

// // const SignupScreen = ({ navigation }: any) => {
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: yupResolver(validationSchema),
// //   });

// //   const handleSignup = (data: { name: string; email: string; password: string }) => {
// //     alert('Signup Successful');
// //     // Add signup logic here (e.g., save user data to database or backend)
// //     navigation.navigate('Login'); // Navigate to the Login page
// //   };

// //   const handleGoogleSignup = () => {
// //     alert('Sign Up with Google');
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Top half with background image */}
// //       <View style={styles.imageContainer}>
// //         <ImageBackground
// //           source={require('../assets/patient.png')}
// //           style={styles.imageBackground}
// //         />
// //       </View>

// //       {/* Bottom half with signup form */}
// //       <View style={styles.formContainer}>
// //         <Text style={styles.header}>Sign Up</Text>

// //         {/* Name field */}
// //         <Controller
// //           control={control}
// //           name="name"
// //           render={({ field: { onChange, onBlur, value } }) => (
// //             <>
// //               <TextInput
// //                 label="Name"
// //                 value={value}
// //                 onChangeText={onChange}
// //                 onBlur={onBlur}
// //                 style={styles.input}
// //                 error={!!errors.name}
// //               />
// //               {errors.name && (
// //                 <HelperText type="error" visible={!!errors.name}>
// //                   {errors.name.message}
// //                 </HelperText>
// //               )}
// //             </>
// //           )}
// //         />

// //         {/* Email field */}
// //         <Controller
// //           control={control}
// //           name="email"
// //           render={({ field: { onChange, onBlur, value } }) => (
// //             <>
// //               <TextInput
// //                 label="Email"
// //                 value={value}
// //                 onChangeText={onChange}
// //                 onBlur={onBlur}
// //                 style={styles.input}
// //                 keyboardType="email-address"
// //                 error={!!errors.email}
// //               />
// //               {errors.email && (
// //                 <HelperText type="error" visible={!!errors.email}>
// //                   {errors.email.message}
// //                 </HelperText>
// //               )}
// //             </>
// //           )}
// //         />

// //         {/* Password field */}
// //         <Controller
// //           control={control}
// //           name="password"
// //           render={({ field: { onChange, onBlur, value } }) => (
// //             <>
// //               <TextInput
// //                 label="Password"
// //                 value={value}
// //                 onChangeText={onChange}
// //                 onBlur={onBlur}
// //                 secureTextEntry
// //                 style={styles.input}
// //                 error={!!errors.password}
// //               />
// //               {errors.password && (
// //                 <HelperText type="error" visible={!!errors.password}>
// //                   {errors.password.message}
// //                 </HelperText>
// //               )}
// //             </>
// //           )}
// //         />

// //         {/* Signup button */}
// //         <Button mode="contained" onPress={handleSubmit(handleSignup)} style={styles.button}>
// //           Sign Up
// //         </Button>

// //         {/* Google Sign Up Button */}
// //         <View style={styles.googleButtonContainer}>
// //           <Button mode="outlined" onPress={handleGoogleSignup} style={styles.googleButton}>
// //             <View style={styles.googleButtonContent}>
// //               <View style={styles.googleLogoContainer}>
// //                 <Image
// //                   source={require('../assets/google3.png')} // Ensure correct path for the image
// //                   style={styles.googleLogo}
// //                 />
// //               </View>
// //               <Text style={styles.googleButtonText}>Sign up with Google</Text>
// //             </View>
// //           </Button>
// //         </View>

// //         {/* Log in link */}
// //         <View style={styles.loginLinkContainer}>
// //           <Text style={styles.loginText}>
// //             Already have an account?{' '}
// //             <Text
// //               style={styles.loginLink}
// //               onPress={() => navigation.navigate('Login')}
// //             >
// //               Log in
// //             </Text>
// //           </Text>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   imageContainer: {
// //     flex: 1,
// //   },
// //   imageBackground: {
// //     flex: 1,
// //     resizeMode: 'cover',
// //   },
// //   formContainer: {
// //     flex: 2,
// //     padding: 16,
// //     backgroundColor: '#fff',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: -2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     width: '100%',
// //     elevation: 5,
// //   },
// //   header: {
// //     fontSize: 30,
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   input: {
// //     marginBottom: 10,
// //   },
// //   button: {
// //     marginTop: 20,
// //   },
// //   googleButtonContainer: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   googleButton: {
// //     paddingHorizontal: 10,
// //     width: '100%',
// //     paddingVertical: 1,
// //     backgroundColor: '#fff',
// //     borderRadius: 25,
// //     borderWidth: 1,
// //     borderColor: '#4285F4',
// //     alignSelf: 'center',
// //   },
// //   googleButtonContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   googleLogo: {
// //     width: 24,
// //     height: 24,
// //   },
// //   googleLogoContainer: {
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginRight: 30,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //   },
// //   googleButtonText: {
// //     color: '#000',
// //     fontSize: 16,
// //     marginLeft: 10,
// //     flex: 1,
// //     textAlign: 'left',
// //   },
// //   loginLinkContainer: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   loginText: {
// //     fontSize: 14,
// //     color: '#000',
// //   },
// //   loginLink: {
// //     fontSize: 14,
// //     color: '#4285F4',
// //     textDecorationLine: 'underline',
// //   },
// // });

// // export default SignupScreen;
// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Card, Text, Button, TextInput, Menu } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const EditAppointment = ({ route, navigation }: { route: any; navigation: any }) => {
//   const { appointmentId } = route.params;

//   // State for form fields
//   const [specialization, setSpecialization] = useState(appointmentId.spec || '');
//   const [doctor, setDoctor] = useState(appointmentId.doctor || '');
//   const [date, setDate] = useState(new Date(appointmentId.date || Date.now()));
//   const [time, setTime] = useState(appointmentId.time || '');
//   const [appointmentType, setAppointmentType] = useState('Routine Checkup');

//   // Dropdown menu visibility
//   const [specializationMenuVisible, setSpecializationMenuVisible] = useState(false);
//   const [doctorMenuVisible, setDoctorMenuVisible] = useState(false);
//   const [appointmentTypeMenuVisible, setAppointmentTypeMenuVisible] = useState(false);

//   // Date and Time Picker visibility
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   // Mapping of doctors to their specializations
//   const doctors = [
//     { name: 'Dr. Wagh', specialization: 'Cardiologist' },
//     { name: 'Dr. Sharma', specialization: 'Dentist' },
//     { name: 'Dr. Pukale', specialization: 'Orthopedic' },
//   ];

//   const appointmentTypes = ['Routine Checkup', 'Consultation', 'Follow-Up'];

//   // Filter doctors based on selected specialization
//   const filteredDoctors = doctors.filter((doc) => doc.specialization === specialization);

//   // Booked slots for specific doctors and dates
//   const doctorAvailability: Record<string, Record<string, string[]>> = {
//     'Dr. Wagh': {
//       '2025-01-11': ['09:00 AM', '10:00 AM'], // Example booked slots
//       '2025-01-12': ['11:00 AM'],
//     },
//     'Dr. Sharma': {
//       '2025-01-11': ['09:30 AM', '01:00 PM'],
//     },
//     'Dr. Pukale': {
//       '2025-01-11': ['10:00 AM', '03:00 PM'],
//     },
//   };

//   // Define all possible time slots
//   const timeSlots = [
//     '09:00 AM',
//     '09:30 AM',
//     '10:00 AM',
//     '10:30 AM',
//     '11:00 AM',
//     '11:30 AM',
//     '12:00 PM',
//     '12:30 PM',
//     '01:00 PM',
//     '01:30 PM',
//     '02:00 PM',
//     '02:30 PM',
//     '03:00 PM',
//     '03:30 PM',
//     '04:00 PM',
//   ];

//   // Filter available time slots based on doctor's availability and selected date
//   const availableTimeSlots =
//     doctorAvailability[doctor]?.[date.toISOString().split('T')[0]] || timeSlots;

//   // Handlers for date and time pickers
//   const handleDateChange = (event: any, selectedDate: Date | undefined) => {
//     setShowDatePicker(false);
//     if (selectedDate) setDate(selectedDate);
//   };

//   const handleTimeChange = (selectedTime: string) => {
//     setTime(selectedTime);
//     setShowTimePicker(false);
//   };

//   const handleSaveChanges = () => {
//     // Create the updated appointment object
//     const updatedAppointment = {
//       id: appointmentId.id, // Use the original appointment ID
//       doctor,
//       date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
//       time,
//       spec: specialization,
//       appointmentType,
//     };

//     // Pass the updated appointment back to HomePage
//     navigation.navigate('Home', { updatedAppointment });

//     // Optionally go back to the HomePage
//     // navigation.goBack();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Specialization Field */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Text style={styles.label}>Specialization</Text>
//           <TextInput
//             mode="outlined"
//             value={specialization}
//             onFocus={() => setSpecializationMenuVisible(true)}
//             onChangeText={setSpecialization}
//             style={styles.input}
//             placeholder="Select or type specialization"
//           />
//           <Menu
//             visible={specializationMenuVisible}
//             onDismiss={() => setSpecializationMenuVisible(false)}
//             anchor={
//               <Button mode="text" onPress={() => setSpecializationMenuVisible(true)}>
//                 Select Specialization
//               </Button>
//             }
//           >
//             {['Cardiologist', 'Dentist', 'Orthopedic'].map((spec) => (
//               <Menu.Item
//                 key={spec}
//                 onPress={() => {
//                   setSpecialization(spec);
//                   setSpecializationMenuVisible(false);
//                   setDoctor(''); // Reset doctor when specialization changes
//                 }}
//                 title={spec}
//               />
//             ))}
//           </Menu>
//         </Card.Content>
//       </Card>

//       {/* Doctor Field */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Text style={styles.label}>Doctor</Text>
//           <TextInput
//             mode="outlined"
//             value={doctor}
//             onChangeText={setDoctor}
//             style={styles.input}
//             placeholder="Select or type doctor"
//             onFocus={() => setDoctorMenuVisible(true)}
//           />
//           <Menu
//             visible={doctorMenuVisible}
//             onDismiss={() => setDoctorMenuVisible(false)}
//             anchor={
//               <Button mode="text" onPress={() => setDoctorMenuVisible(true)}>
//                 Select Doctor
//               </Button>
//             }
//           >
//             {filteredDoctors.map((doc) => (
//               <Menu.Item
//                 key={doc.name}
//                 onPress={() => {
//                   setDoctor(doc.name);
//                   setDoctorMenuVisible(false);
//                 }}
//                 title={doc.name}
//               />
//             ))}
//           </Menu>
//         </Card.Content>
//       </Card>

//       {/* Appointment Date Field */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Text style={styles.label}>Appointment Date</Text>
//           <TextInput
//             mode="outlined"
//             value={date.toISOString().split('T')[0]}
//             onFocus={() => setShowDatePicker(true)}
//             style={styles.input}
//           />
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}
//         </Card.Content>
//       </Card>

//       {/* Visit Time Field */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Text style={styles.label}>Visit Time</Text>
//           <TextInput
//             mode="outlined"
//             value={time}
//             onFocus={() => setShowTimePicker(true)}
//             style={styles.input}
//             placeholder="Select Time"
//           />
//           {showTimePicker && (
//             <Menu
//               visible={showTimePicker}
//               onDismiss={() => setShowTimePicker(false)}
//               anchor={
//                 <Button mode="text" onPress={() => setShowTimePicker(true)}>
//                   Select Time
//                 </Button>
//               }
//             >
//               {availableTimeSlots.map((slot) => (
//                 <Menu.Item
//                   key={slot}
//                   onPress={() => handleTimeChange(slot)}
//                   title={slot}
//                 />
//               ))}
//             </Menu>
//           )}
//         </Card.Content>
//       </Card>

//       {/* Appointment Type Field */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Text style={styles.label}>Type of Appointment</Text>
//           <TextInput
//             mode="outlined"
//             value={appointmentType}
//             onFocus={() => setAppointmentTypeMenuVisible(true)}
//             onChangeText={setAppointmentType}
//             style={styles.input}
//             placeholder="Select or type appointment type"
//           />
//           <Menu
//             visible={appointmentTypeMenuVisible}
//             onDismiss={() => setAppointmentTypeMenuVisible(false)}
//             anchor={
//               <Button mode="text" onPress={() => setAppointmentTypeMenuVisible(true)}>
//                 Select Appointment Type
//               </Button>
//             }
//           >
//             {appointmentTypes.map((type) => (
//               <Menu.Item
//                 key={type}
//                 onPress={() => {
//                   setAppointmentType(type);
//                   setAppointmentTypeMenuVisible(false);
//                 }}
//                 title={type}
//               />
//             ))}
//           </Menu>
//         </Card.Content>
//       </Card>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <Button mode="contained" style={styles.saveButton} onPress={handleSaveChanges}>
//           Save Changes
//         </Button>
//         <Button mode="outlined" style={styles.cancelButton} onPress={() => navigation.goBack()}>
//           Cancel
//         </Button>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     backgroundColor: '#f8f9fa',
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: '#4A90E2',
//     backgroundColor: 'white',
//     elevation: 2,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4A90E2',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: 'white',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   saveButton: {
//     flex: 1,
//     marginRight: 8,
//     backgroundColor: '#4A90E2',
//   },
//   cancelButton: {
//     flex: 1,
//     marginLeft: 8,
//     borderColor: '#4A90E2',
//   },
// });

// export default EditAppointment;














// import React from 'react';
// import { View, StyleSheet, Image, ImageBackground } from 'react-native';
// import { TextInput, Button, Text, HelperText } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { signup } from '../src/services/authservice';

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
//       alert('Signup Successful');
//       navigation.navigate('Login'); // Navigate to the Login page
//     } catch (error) {
//       alert(error); // Show error message
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

// export default SignupScreen;







import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signup } from '../src/services/authservice';

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
      alert('Signup Successful');
      navigation.navigate('Login'); // Navigate to the Login page
    } catch (error) {
      console.log('Signup error:', error); // Log the full error for debugging
      let errorMessage = 'An unexpected error occurred';
  
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        errorMessage = error.message; // Safely access the message property
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message; // Explicitly type the error
      } else if (typeof error === 'string') {
        errorMessage = error; // Handle string errors
      }
  
      alert(`Error: ${errorMessage}`);
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