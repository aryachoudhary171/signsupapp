
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
// import { TextInput, HelperText } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Calendar, DateData } from 'react-native-calendars';

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
//   // Add more date-specific time slots here
// };

// // Validation schema using yup
// const validationSchema = yup.object().shape({
//   fullName: yup.string().required('Full Name is required'),
//   contact: yup
//     .string()
//     .matches(/^\d{10}$/, 'Contact number must be 10 digits')
//     .required('Contact number is required'),
//   hospital: yup.string().required('Hospital is required'),
//   doctor: yup.string().required('Doctor is required'),
//   timeslot: yup.string().required('Timeslot is required'),
//   date: yup.string().required('Date is required'),
// });

// const BookAppointment = ({ route }: { route: any }) => {
//   const navigation = useNavigation();
//   const [selectedHospital, setSelectedHospital] = useState<string>('');
//   const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState<boolean>(false); // For showing the calendar modal

//   const { control, handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   // Get the function to add appointment from the previous screen (HomePage)
//   const { addAppointment } = route.params || {};

//   useEffect(() => {
//     if (selectedDate) {
//       setAvailableTimeSlots(availableSlotsData[selectedDate] || []);
//     }
//   }, [selectedDate]);

//   const onSubmit = async (data: any) => {
//     try {
//       const newAppointment = {
//         id: new Date().toString(), // Generate a unique ID
//         doctor: data.doctor,
//         date: data.date, // Use the selected date
//         time: data.timeslot,
//         spec: data.hospital, // We can use hospital as specialization
//       };

//       if (addAppointment) {
//         // Pass the new appointment to the HomePage
//         addAppointment(newAppointment);
//       }

//       // Navigate back to HomePage
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//     }
//   };

//   const handleHospitalChange = (hospital: string) => {
//     setSelectedHospital(hospital);
//     setAvailableDoctors(hospitalData[hospital] || []);
//   };

//   const openDatePicker = () => {
//     setModalVisible(true); // Open the modal to select a date
//   };

//   const handleDaySelect = (day: DateData) => {
//     setSelectedDate(day.dateString); // Set the selected date
//     setValue('date', day.dateString); // Set the form value
//     setModalVisible(false); // Close the modal after selecting a date
//   };

//   return (
//     <View style={styles.container}>
//       {/* Full Name */}
//       <Controller
//         name="fullName"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Full Name"
//               value={field.value}
//               onChangeText={field.onChange}
//               mode="outlined"
//               style={styles.input}
//               theme={{ colors: { primary: '#6200ea' } }}
//             />
//             {errors.fullName && (
//               <HelperText type="error" visible={true}>
//                 {errors.fullName.message}
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
//                 editable={false} // The date is selected from the calendar, not typed manually
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

//       {/* Submit Button */}
//       <Button
//         title="Save Changes"
//         onPress={handleSubmit(onSubmit)}
//         color="#6200ea"
//       />
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
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#fff',
//     borderColor: '#6200ea',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
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
// });

// export default BookAppointment;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, DateData } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  fullName: yup.string().required('Full Name is required'),
  contact: yup
    .string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),
  hospital: yup.string().required('Hospital is required'),
  doctor: yup.string().required('Doctor is required'),
  timeslot: yup.string().required('Timeslot is required'),
  date: yup.string().required('Date is required'),
});

const BookAppointment = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // For showing the calendar modal

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(availableSlotsData[selectedDate] || []);
    }
  }, [selectedDate]);

  const handleHospitalChange = (hospital: string) => {
    setSelectedHospital(hospital);
    setAvailableDoctors(hospitalData[hospital] || []);
  };

  const openDatePicker = () => {
    setModalVisible(true); // Open the modal to select a date
  };

  const handleDaySelect = (day: DateData) => {
    setSelectedDate(day.dateString); // Set the selected date
    setValue('date', day.dateString); // Set the form value
    setModalVisible(false); // Close the modal after selecting a date
  };

  const onSubmit = async (data: any) => {
    try {
      // Get the stored token
      const token = await AsyncStorage.getItem('user_token');

      if (!token) {
        throw new Error('No token found, please log in again.');
      }

      const newAppointment = {
        fullname: data.fullName,
        contact_info: data.contact,
        date: data.date,
        timeslot: data.timeslot,
        reason: "General checkup", // You can adjust this as needed
        doctorId: data.doctor, // Assume doctor id is in the form value
        hospitalId: data.hospital, // Assume hospital id is in the form value
      };

      // Send the request to the backend to create the appointment
      const response = await axios.post(
        'http://10.1.6.157:3000/appointment/create', 
        newAppointment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // If appointment is created successfully
      console.log(response.data);

      // Navigate back after the appointment is booked
      navigation.goBack();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <>
            <TextInput
              label="Full Name"
              value={field.value}
              onChangeText={field.onChange}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#6200ea' } }}
            />
            {errors.fullName && (
              <HelperText type="error" visible={true}>
                {errors.fullName.message}
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
              label="Contact"
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
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

      {/* Hospital */}
      <Controller
        name="hospital"
        control={control}
        render={({ field }) => (
          <>
            <Text style={styles.label}>Select Hospital</Text>
            <Picker
              selectedValue={field.value}
              style={styles.picker}
              onValueChange={(itemValue) => {
                field.onChange(itemValue);
                handleHospitalChange(itemValue);
              }}
            >
              <Picker.Item label="Select a Hospital" value="" />
              {Object.keys(hospitalData).map((hospital) => (
                <Picker.Item key={hospital} label={hospital} value={hospital} />
              ))}
            </Picker>
            {errors.hospital && (
              <HelperText type="error" visible={true}>
                {errors.hospital.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Doctor */}
      <Controller
        name="doctor"
        control={control}
        render={({ field }) => (
          <>
            <Text style={styles.label}>Select Doctor</Text>
            <Picker
              selectedValue={field.value}
              style={styles.picker}
              onValueChange={(itemValue) => field.onChange(itemValue)}
              enabled={availableDoctors.length > 0}
            >
              <Picker.Item label="Select a Doctor" value="" />
              {availableDoctors.map((doctor) => (
                <Picker.Item key={doctor} label={doctor} value={doctor} />
              ))}
            </Picker>
            {errors.doctor && (
              <HelperText type="error" visible={true}>
                {errors.doctor.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Date */}
      <Text style={styles.label}>Select Date</Text>
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <>
            <TouchableOpacity onPress={openDatePicker}>
              <TextInput
                label="Date"
                value={field.value || selectedDate}
                editable={false} // The date is selected from the calendar, not typed manually
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: '#6200ea' } }}
              />
            </TouchableOpacity>
            {errors.date && (
              <HelperText type="error" visible={true}>
                {errors.date.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Modal for Calendar */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={handleDaySelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#6200ea' },
            }}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} color="#6200ea" />
        </View>
      </Modal>

      {/* Timeslot */}
      <Controller
        name="timeslot"
        control={control}
        render={({ field }) => (
          <>
            <Text style={styles.label}>Select Timeslot</Text>
            <Picker
              selectedValue={field.value}
              style={styles.picker}
              onValueChange={(itemValue) => field.onChange(itemValue)}
            >
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot) => (
                  <Picker.Item key={slot} label={slot} value={slot} />
                ))
              ) : (
                <Picker.Item label="No available slots for this date" value="" />
              )}
            </Picker>
            {errors.timeslot && (
              <HelperText type="error" visible={true}>
                {errors.timeslot.message}
              </HelperText>
            )}
          </>
        )}
      />

      {/* Submit Button */}
      <Button
        title="Save Changes"
        onPress={handleSubmit(onSubmit)}
        color="#6200ea"
      />
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
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default BookAppointment;

