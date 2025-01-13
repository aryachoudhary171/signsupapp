// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { TextInput, HelperText } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// // Define hospital and doctor data
// const hospitalData: Record<string, string[]> = {
//   "City Hospital": ["Dr. Wagh", "Dr. Sharma", "Dr. Pukale"],
//   "Global Care": ["Dr. Mehta", "Dr. Reddy"],
//   "Sunshine Clinic": ["Dr. Joshi", "Dr. Patel"],
// };

// // Validation schema using yup
// const validationSchema = yup.object().shape({
//   fullName: yup.string().required('Full Name is required'),
//   contact: yup
//     .string()
//     .matches(/^\d{10}$/, 'Contact number must be 10 digits') // Ensure 10 digits
//     .required('Contact number is required'),
//   hospital: yup.string().required('Hospital is required'),
//   doctor: yup.string().required('Doctor is required'),
//   timeslot: yup.string().required('Timeslot is required'),
// });

// const BookAppointment = () => {
//   const navigation = useNavigation();

//   const [selectedHospital, setSelectedHospital] = useState<string>('');
//   const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);

//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit = (data: any) => {
//     console.log(data);
//     navigation.navigate('Home' as never); // Fix: type-casting to 'never' for safe navigation
//   };

//   const handleHospitalChange = (hospital: string) => {
//     setSelectedHospital(hospital);
//     setAvailableDoctors(hospitalData[hospital] || []);
//   };

//   return (
//     <View style={styles.container}>
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

//       <Controller
//         name="contact"
//         control={control}
//         render={({ field }) => (
//           <>
//             <TextInput
//               label="Contact"
//               value={field.value}
//               onChangeText={field.onChange}
//               keyboardType="numeric" // Allow only numeric input
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
//               enabled={availableDoctors.length > 0} // Disable if no doctors available
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
//               <Picker.Item label="9:00 AM - 10:00 AM" value="9:00 AM - 10:00 AM" />
//               <Picker.Item label="10:00 AM - 11:00 AM" value="10:00 AM - 11:00 AM" />
//               <Picker.Item label="11:00 AM - 12:00 PM" value="11:00 AM - 12:00 PM" />
//             </Picker>
//             {errors.timeslot && (
//               <HelperText type="error" visible={true}>
//                 {errors.timeslot.message}
//               </HelperText>
//             )}
//           </>
//         )}
//       />

//       <Button
//         title="Book Appointment"
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
// });

// export default BookAppointment;
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define hospital and doctor data
const hospitalData: Record<string, string[]> = {
  "City Hospital": ["Dr. Wagh", "Dr. Sharma", "Dr. Pukale"],
  "Global Care": ["Dr. Mehta", "Dr. Reddy"],
  "Sunshine Clinic": ["Dr. Joshi", "Dr. Patel"],
};

// Validation schema using yup
const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  contact: yup
    .string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),
  hospital: yup.string().required('Hospital is required'),
  doctor: yup.string().required('Doctor is required'),
  timeslot: yup.string().required('Timeslot is required'),
});

const BookAppointment = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Get the function to add appointment from the previous screen (HomePage)
  const { addAppointment } = route.params || {};

  const onSubmit = async (data: any) => {
    try {
      const newAppointment = {
        id: new Date().toString(), // Generate a unique ID
        doctor: data.doctor,
        date: data.timeslot.split(' - ')[0], // Take the starting time as the date
        time: data.timeslot,
        spec: data.hospital, // We can use hospital as specialization
      };

      if (addAppointment) {
        // Pass the new appointment to the HomePage
        addAppointment(newAppointment);
      }

      // Navigate back to HomePage
      navigation.goBack();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleHospitalChange = (hospital: string) => {
    setSelectedHospital(hospital);
    setAvailableDoctors(hospitalData[hospital] || []);
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
              <Picker.Item label="9:00 AM - 10:00 AM" value="9:00 AM - 10:00 AM" />
              <Picker.Item label="10:00 AM - 11:00 AM" value="10:00 AM - 11:00 AM" />
              <Picker.Item label="11:00 AM - 12:00 PM" value="11:00 AM - 12:00 PM" />
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
        title="Book Appointment"
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
});

export default BookAppointment;
