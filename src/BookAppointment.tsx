
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
// import { TextInput, HelperText } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Calendar, DateData } from 'react-native-calendars';
// import { StackNavigationProp } from '@react-navigation/stack';

// // Define hospital and doctor data
// const hospitalData: Record<string, string[]> = {
//   "City Hospital": ["Dr. Wagh", "Dr. Sharma", "Dr. Pukale"],
//   "Global Care": ["Dr. Mehta", "Dr. Reddy"],
//   "Sunshine Clinic": ["Dr. Joshi", "Dr. Patel"],
// };

// // Example time slots data (based on the selected date)
// const availableSlotsData: Record<string, string[]> = {
//   "2025-01-16": ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
//   "2025-01-17": ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"],
// };

// // Define types for navigation and route params
// type RootStackParamList = {
//   BookAppointment: undefined;
//   AddAppointment: undefined;
// };

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   contact: yup
//     .string()
//     .matches(/^\d{10}$/, 'Contact number must be 10 digits')
//     .required('Contact number is required'),
//   hospital: yup.string().required('Hospital is required'),
//   doctor: yup.string().required('Doctor is required'),
//   timeslot: yup.string().required('Timeslot is required'),
//   date: yup.string().required('Date is required'),
//   reason: yup.string().required('Reason is required'),
// });

// const BookAppointment = ({ route }: { route: any }) => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Type navigation
//   const [selectedHospital, setSelectedHospital] = useState<string>('');
//   const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const { control, handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const { addAppointment } = route.params || {};

//   useEffect(() => {
//     if (selectedDate) {
//       setAvailableTimeSlots(availableSlotsData[selectedDate] || []);
//     }
//   }, [selectedDate]);

//   const onSubmit = async (data: any) => {
//     try {
//       const newAppointment = {
//         id: new Date().toString(),
//         doctor: data.doctor,
//         date: data.date,
//         time: data.timeslot,
//         spec: data.hospital,
//       };

//       if (addAppointment) {
//         addAppointment(newAppointment); // Add the new appointment
//       }

//       // Navigate to AddAppointment screen
//       navigation.navigate('AddAppointment'); // Correctly navigate to the screen
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//     }
//   };

//   const handleHospitalChange = (hospital: string) => {
//     setSelectedHospital(hospital);
//     setAvailableDoctors(hospitalData[hospital] || []);
//   };

//   const openDatePicker = () => {
//     setModalVisible(true);
//   };

//   const handleDaySelect = (day: DateData) => {
//     setSelectedDate(day.dateString);
//     setValue('date', day.dateString);
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* First Name */}
//       <Controller
//         name="firstName"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="First Name"
//               value={field.value}
//               onChangeText={(text) => field.onChange(text.charAt(0).toUpperCase() + text.slice(1))}
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.firstName && (
//               <HelperText type="error" visible={true}>
//                 {errors.firstName.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Last Name */}
//       <Controller
//         name="lastName"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Last Name"
//               value={field.value}
//               onChangeText={(text) => field.onChange(text.charAt(0).toUpperCase() + text.slice(1))}
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.lastName && (
//               <HelperText type="error" visible={true}>
//                 {errors.lastName.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Contact */}
//       <Controller
//         name="contact"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Contact"
//               value={field.value}
//               onChangeText={field.onChange}
//               keyboardType="numeric"
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.contact && (
//               <HelperText type="error" visible={true}>
//                 {errors.contact.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Hospital */}
//       <Controller
//         name="hospital"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Hospital</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => {
//                 field.onChange(itemValue);
//                 handleHospitalChange(itemValue);
//               }}
//             >
//               <Picker.Item label="Select a Hospital" value="" />
//               {Object.keys(hospitalData).map((hospital) => (
//                 <Picker.Item key={hospital} label={hospital} value={hospital} />
//               ))}
//             </Picker>
//             {errors.hospital && (
//               <HelperText type="error" visible={true}>
//                 {errors.hospital.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Doctor */}
//       <Controller
//         name="doctor"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Doctor</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//               enabled={availableDoctors.length > 0}
//             >
//               <Picker.Item label="Select a Doctor" value="" />
//               {availableDoctors.map((doctor) => (
//                 <Picker.Item key={doctor} label={doctor} value={doctor} />
//               ))}
//             </Picker>
//             {errors.doctor && (
//               <HelperText type="error" visible={true}>
//                 {errors.doctor.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Date */}
//       <Text style={styles.label}>Select Date</Text>
//       <Controller
//         name="date"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TouchableOpacity onPress={openDatePicker}>
//               <TextInput
//                 label="Date"
//                 value={field.value || selectedDate}
//                 editable={false}
//                 mode="outlined"
//                 style={styles.input}
//                 theme={{ colors: { primary: '#6200ea' } }}
//               />
//             </TouchableOpacity>
//             {errors.date && (
//               <HelperText type="error" visible={true}>
//                 {errors.date.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Modal for Calendar */}
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Calendar
//             onDayPress={handleDaySelect}
//             markedDates={{
//               [selectedDate]: { selected: true, selectedColor: '#6200ea' },
//             }}
//           />
//           <Button title="Close" onPress={() => setModalVisible(false)} color="#6200ea" />
//         </View>
//       </Modal>

//       {/* Timeslot */}
//       <Controller
//         name="timeslot"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Timeslot</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//             >
//               {availableTimeSlots.length > 0 ? (
//                 availableTimeSlots.map((slot) => (
//                   <Picker.Item key={slot} label={slot} value={slot} />
//                 ))
//               ) : (
//                 <Picker.Item label="No available slots for this date" value="" />
//               )}
//             </Picker>
//             {errors.timeslot && (
//               <HelperText type="error" visible={true}>
//                 {errors.timeslot.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Reason */}
//       <Controller
//         name="reason"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Reason</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//             >
//               <Picker.Item label="Consultation" value="consultation" />
//               <Picker.Item label="Routine Checkup" value="routineCheckup" />
//               <Picker.Item label="Follow Up" value="followUp" />
//             </Picker>
//             {errors.reason && (
//               <HelperText type="error" visible={true}>
//                 {errors.reason.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Submit Button */}
//       <Button title="Save Changes" onPress={handleSubmit(onSubmit)} color="#6200ea" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   input: {
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     paddingLeft: 15, // Add padding inside inputs for better spacing
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     fontSize: 16,
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     borderColor: '#6200ea',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//     alignSelf: 'stretch', // Ensure picker takes full width
//     fontSize: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff', // Add background color for modal
//   },
//   button: {
//     backgroundColor: '#6200ea', // Button color matching the app theme
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   helperText: {
//     color: 'red',
//     fontSize: 12,
//   },
// });
//  export default BookAppointment;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
// import { TextInput, HelperText, IconButton } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Calendar, DateData } from 'react-native-calendars';
// import { StackNavigationProp } from '@react-navigation/stack';

// // Define hospital and doctor data
// const hospitalData: Record<string, string[]> = {
//   "City Hospital": ["Dr. Wagh", "Dr. Sharma", "Dr. Pukale"],
//   "Global Care": ["Dr. Mehta", "Dr. Reddy"],
//   "Sunshine Clinic": ["Dr. Joshi", "Dr. Patel"],
// };

// // Example time slots data (based on the selected date)
// const availableSlotsData: Record<string, string[]> = {
//   "2025-01-16": ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
//   "2025-01-17": ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"],
// };

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   contact: yup
//     .string()
//     .matches(/^\d{10}$/, 'Contact number must be 10 digits')
//     .required('Contact number is required'),
//   hospital: yup.string().required('Hospital is required'),
//   doctor: yup.string().required('Doctor is required'),
//   timeslot: yup.string().required('Timeslot is required'),
//   date: yup.string().required('Date is required'),
//   reason: yup.string().required('Reason is required'),
// });

// type RootStackParamList = {
//   BookAppointment: undefined;
//   AddAppointment: undefined;
// };

// const BookAppointment = ({ route }: { route: any }) => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Type navigation
//   const [selectedHospital, setSelectedHospital] = useState<string>('');
//   const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const { control, handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const { addAppointment } = route.params || {};

//   useEffect(() => {
//     if (selectedDate) {
//       setAvailableTimeSlots(availableSlotsData[selectedDate] || []);
//     }
//   }, [selectedDate]);

//   const onSubmit = async (data: any) => {
//     try {
//       const newAppointment = {
//         id: new Date().toString(),
//         doctor: data.doctor,
//         date: data.date,
//         time: data.timeslot,
//         spec: data.hospital,
//       };

//       if (addAppointment) {
//         addAppointment(newAppointment); // Add the new appointment
//       }

//       // Navigate to AddAppointment screen
//       navigation.navigate('AddAppointment');
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//     }
//   };

//   const handleHospitalChange = (hospital: string) => {
//     setSelectedHospital(hospital);
//     setAvailableDoctors(hospitalData[hospital] || []);
//   };

//   const openDatePicker = () => {
//     setModalVisible(true);
//   };

//   const handleDaySelect = (day: DateData) => {
//     setSelectedDate(day.dateString);
//     setValue('date', day.dateString);
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* First Name */}
//       <Controller
//         name="firstName"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="First Name"
//               value={field.value}
//               onChangeText={(text) => field.onChange(text.charAt(0).toUpperCase() + text.slice(1))}
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.firstName && (
//               <HelperText type="error" visible={true}>
//                 {errors.firstName.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Last Name */}
//       <Controller
//         name="lastName"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Last Name"
//               value={field.value}
//               onChangeText={(text) => field.onChange(text.charAt(0).toUpperCase() + text.slice(1))}
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.lastName && (
//               <HelperText type="error" visible={true}>
//                 {errors.lastName.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Contact */}
//       <Controller
//         name="contact"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Contact"
//               value={field.value}
//               onChangeText={field.onChange}
//               keyboardType="numeric"
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.contact && (
//               <HelperText type="error" visible={true}>
//                 {errors.contact.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Hospital */}
//       <Controller
//         name="hospital"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Hospital</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => {
//                 field.onChange(itemValue);
//                 handleHospitalChange(itemValue);
//               }}
//             >
//               <Picker.Item label="Select a Hospital" value="" />
//               {Object.keys(hospitalData).map((hospital) => (
//                 <Picker.Item key={hospital} label={hospital} value={hospital} />
//               ))}
//             </Picker>
//             {errors.hospital && (
//               <HelperText type="error" visible={true}>
//                 {errors.hospital.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Doctor */}
//       <Controller
//         name="doctor"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Doctor</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//               enabled={availableDoctors.length > 0}
//             >
//               <Picker.Item label="Select a Doctor" value="" />
//               {availableDoctors.map((doctor) => (
//                 <Picker.Item key={doctor} label={doctor} value={doctor} />
//               ))}
//             </Picker>
//             {errors.doctor && (
//               <HelperText type="error" visible={true}>
//                 {errors.doctor.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Date */}
//       <Text style={styles.label}>Select Date</Text>
//       <Controller
//         name="date"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TouchableOpacity onPress={openDatePicker}>
//               <View style={styles.dateInput}>
//                 <TextInput
//                   label="Date"
//                   value={field.value || selectedDate}
//                   editable={false}
//                   mode="outlined"
//                   style={styles.input}
//                   theme={{ colors: { primary: '#6200ea' } }}
//                 />
//                 <IconButton
//                   icon="calendar"
//                   size={24}
//                   onPress={openDatePicker}
//                   style={styles.calendarIcon}
//                 />
//               </View>
//             </TouchableOpacity>
//             {errors.date && (
//               <HelperText type="error" visible={true}>
//                 {errors.date.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Modal for Calendar */}
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Calendar
//             onDayPress={handleDaySelect}
//             markedDates={{
//               [selectedDate]: { selected: true, selectedColor: '#6200ea' },
//             }}
//           />
//           <Button title="Close" onPress={() => setModalVisible(false)} color="#6200ea" />
//         </View>
//       </Modal>

//       {/* Timeslot */}
//       <Controller
//         name="timeslot"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Timeslot</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//             >
//               {availableTimeSlots.length > 0 ? (
//                 availableTimeSlots.map((slot) => (
//                   <Picker.Item key={slot} label={slot} value={slot} />
//                 ))
//               ) : (
//                 <Picker.Item label="No available slots for this date" value="" />
//               )}
//             </Picker>
//             {errors.timeslot && (
//               <HelperText type="error" visible={true}>
//                 {errors.timeslot.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Reason */}
//       <Controller
//         name="reason"
//         control={control}
//         render={({ field }) => (
//           <>
//             <Text style={styles.label}>Select Reason</Text>
//             <Picker
//               selectedValue={field.value}
//               style={styles.picker}
//               onValueChange={(itemValue) => field.onChange(itemValue)}
//             >
//               <Picker.Item label="Consultation" value="consultation" />
//               <Picker.Item label="Routine Checkup" value="routineCheckup" />
//               <Picker.Item label="Follow Up" value="followUp" />
//             </Picker>
//             {errors.reason && (
//               <HelperText type="error" visible={true}>
//                 {errors.reason.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       {/* Submit Button */}
//       <Button title="Save Changes" onPress={handleSubmit(onSubmit)} color="#6200ea" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   input: {
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     fontSize: 16, // Adjust the font size to match the design
//     height: 50,
//     padding: 10,
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     borderColor: '#6200ea',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//     alignSelf: 'stretch', // Ensure picker takes full width
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   calendarIcon: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//   },
//   dateInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });

// export default BookAppointment;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { TextInput, HelperText, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, DateData } from 'react-native-calendars';
import { StackNavigationProp } from '@react-navigation/stack';

// Define hospital and doctor data
const hospitalData: Record<string, string[]> = {
  "City Hospital": ["Dr. Wagh", "Dr. Sharma", "Dr. Pukale"],
  "Global Care": ["Dr. Mehta", "Dr. Reddy"],
  "Sunshine Clinic": ["Dr. Joshi", "Dr. Patel"],
};

// Example time slots data (based on the selected date)
const availableSlotsData: Record<string, string[]> = {
  "2025-01-16": ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
  "2025-01-17": ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"],
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  contact: yup
    .string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),
  hospital: yup.string().required('Hospital is required'),
  doctor: yup.string().required('Doctor is required'),
  timeslot: yup.string().required('Timeslot is required'),
  date: yup.string().required('Date is required'),
  reason: yup.string().required('Reason is required'),
});

type RootStackParamList = {
  BookAppointment: undefined;
  AddAppointment: { newAppointment: any } | undefined; // Update to expect newAppointment prop
};

const BookAppointment = ({ route }: { route: any }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { addAppointment } = route.params || {}; // Add appointment function from route params

  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(availableSlotsData[selectedDate] || []);
    }
  }, [selectedDate]);

  const onSubmit = async (data: any) => {
    try {
      const newAppointment = {
        id: new Date().toISOString(),
        doctor: data.doctor,
        date: data.date,
        time: data.timeslot,
        hospital: data.hospital,
        reason: data.reason,
        name: `${data.firstName} ${data.lastName}`,
        contact: data.contact,
      };

      // Save appointment
      if (addAppointment) {
        addAppointment(newAppointment);
      }

      // Navigate to AddAppointment screen and pass the newAppointment
      navigation.navigate('AddAppointment', { newAppointment });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleHospitalChange = (hospital: string) => {
    setSelectedHospital(hospital);
    setAvailableDoctors(hospitalData[hospital] || []);
  };

  const openDatePicker = () => {
    setModalVisible(true);
  };

  const handleDaySelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    setValue('date', day.dateString);
    setModalVisible(false); // Close calendar after selecting a date
  };

  return (
    <View style={styles.container}>
      {/* First Name */}
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <>
            <TextInput
              label="First Name"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#6200ea' } }}
            />
            {errors.firstName && (
              <HelperText type="error" visible={true}>
                {errors.firstName.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Last Name */}
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <>
            <TextInput
              label="Last Name"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#6200ea' } }}
            />
            {errors.lastName && (
              <HelperText type="error" visible={true}>
                {errors.lastName.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Contact */}
      <Controller
        name="contact"
        control={control}
        render={({ field }) => (
          <>
            <TextInput
              label="Contact Number"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              theme={{ colors: { primary: '#6200ea' } }}
            />
            {errors.contact && (
              <HelperText type="error" visible={true}>
                {errors.contact.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Hospital Picker */}
      <Controller
        name="hospital"
        control={control}
        render={({ field }) => (
          <Picker
            selectedValue={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              handleHospitalChange(value);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Hospital" value="" />
            {Object.keys(hospitalData).map((hospital) => (
              <Picker.Item key={hospital} label={hospital} value={hospital} />
            ))}
          </Picker>
        )}
      />
      {errors.hospital && (
        <HelperText type="error" visible={true}>
          {errors.hospital.message}
        </HelperText>
      )}

      {/* Doctor Picker */}
      <Controller
        name="doctor"
        control={control}
        render={({ field }) => (
          <Picker
            selectedValue={field.value}
            onValueChange={(value) => field.onChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Doctor" value="" />
            {availableDoctors.map((doctor, index) => (
              <Picker.Item key={index} label={doctor} value={doctor} />
            ))}
          </Picker>
        )}
      />
      {errors.doctor && (
        <HelperText type="error" visible={true}>
          {errors.doctor.message}
        </HelperText>
      )}

      {/* Date Picker */}
      <TouchableOpacity onPress={openDatePicker}>
        <TextInput
          label="Select Date"
          value={selectedDate}
          editable={false}
          mode="outlined"
          style={styles.input}
        />
      </TouchableOpacity>

      {/* Time Slot Picker */}
      <Controller
        name="timeslot"
        control={control}
        render={({ field }) => (
          <Picker
            selectedValue={field.value}
            onValueChange={(value) => field.onChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Time Slot" value="" />
            {availableTimeSlots.map((slot, index) => (
              <Picker.Item key={index} label={slot} value={slot} />
            ))}
          </Picker>
        )}
      />
      {errors.timeslot && (
        <HelperText type="error" visible={true}>
          {errors.timeslot.message}
        </HelperText>
      )}

      {/* Reason Picker (Dropdown) */}
      <Controller
        name="reason"
        control={control}
        render={({ field }) => (
          <Picker
            selectedValue={field.value}
            onValueChange={(value) => field.onChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Reason" value="" />
            <Picker.Item label="Checkup" value="Checkup" />
            <Picker.Item label="Emergency" value="Emergency" />
            <Picker.Item label="Follow-up" value="Follow-up" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        )}
      />
      {errors.reason && (
        <HelperText type="error" visible={true}>
          {errors.reason.message}
        </HelperText>
      )}

      {/* Submit Button */}
      <Button title="Save Appointment" onPress={handleSubmit(onSubmit)} color="#6200ea" />

      {/* Calendar Modal */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <Calendar
          current={new Date()}
          markedDates={{ [selectedDate]: { selected: true } }}
          onDayPress={handleDaySelect}
        />
        <Button title="Close Calendar" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    height: 50,
    padding: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default BookAppointment;
