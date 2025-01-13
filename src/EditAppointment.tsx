import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, TextInput, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define the structure for the doctor availability
type DoctorAvailability = {
  [doctorName: string]: {
    [date: string]: string[];
  };
};

const EditAppointment = ({ route, navigation }: { route: any; navigation: any }) => {
  // Safe handling of appointmentId in case it's undefined
  const { appointmentId } = route.params || {};  
  if (!appointmentId) {
    console.error('No appointment data available.');
    return null; // Or show an error message
  }

  // State for form fields
  const [specialization, setSpecialization] = useState(appointmentId.spec || '');
  const [doctor, setDoctor] = useState(appointmentId.doctor || '');
  const [date, setDate] = useState(new Date(appointmentId.date || Date.now()));
  const [time, setTime] = useState(appointmentId.time || '');
  const [appointmentType, setAppointmentType] = useState('Routine Checkup');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Dropdown menu visibility
  const [specializationMenuVisible, setSpecializationMenuVisible] = useState(false);
  const [doctorMenuVisible, setDoctorMenuVisible] = useState(false);
  const [appointmentTypeMenuVisible, setAppointmentTypeMenuVisible] = useState(false);

  // Date and Time Picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Mapping of doctors to their specializations
  const doctors = [
    { name: 'Dr. Wagh', specialization: 'Cardiologist' },
    { name: 'Dr. Sharma', specialization: 'Dentist' },
    { name: 'Dr. Pukale', specialization: 'Orthopedic' },
  ];

  const appointmentTypes = ['Routine Checkup', 'Consultation', 'Follow-Up'];

  // Define available time slots for each doctor and day
  const doctorAvailability: DoctorAvailability = {
    'Dr. Wagh': {
      '2025-01-10': ['09:00 AM', '11:00 AM', '01:00 PM'],
      '2025-01-11': ['10:00 AM', '12:00 PM', '02:00 PM'],
    },
    'Dr. Sharma': {
      '2025-01-10': ['08:00 AM', '10:00 AM', '02:00 PM'],
      '2025-01-11': ['09:00 AM', '01:00 PM', '03:00 PM'],
    },
    'Dr. Pukale': {
      '2025-01-10': ['09:30 AM', '11:30 AM', '03:00 PM'],
      '2025-01-11': ['08:00 AM', '10:00 AM', '01:30 PM'],
    },
  };

  // Filter doctors based on selected specialization
  const filteredDoctors = doctors.filter((doc) => doc.specialization === specialization);

  // Update available time slots when doctor or date changes
  useEffect(() => {
    if (doctor && date) {
      const formattedDate = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      const slots = doctorAvailability[doctor]?.[formattedDate] || [];
      setAvailableTimes(slots);
    }
  }, [doctor, date]);

  // Handlers for date and time pickers
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  // Save appointment changes and navigate back to Home screen
  const handleSaveChanges = () => {
    const updatedAppointment = {
      id: appointmentId.id, 
      doctor,
      date: date.toISOString().split('T')[0],
      time,
      spec: specialization,
      appointmentType,
    };

    // Navigate with updated appointment data
    navigation.navigate('Home', { updatedAppointment });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Specialization Field */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Specialization</Text>
          <TextInput
            mode="outlined"
            value={specialization}
            onFocus={() => setSpecializationMenuVisible(true)}
            onChangeText={setSpecialization}
            style={styles.input}
            placeholder="Select or type specialization"
          />
          <Menu
            visible={specializationMenuVisible}
            onDismiss={() => setSpecializationMenuVisible(false)}
            anchor={
              <Button mode="text" onPress={() => setSpecializationMenuVisible(true)}>
                Select Specialization
              </Button>
            }
          >
            {['Cardiologist', 'Dentist', 'Orthopedic'].map((spec) => (
              <Menu.Item
                key={spec}
                onPress={() => {
                  setSpecialization(spec);
                  setSpecializationMenuVisible(false);
                  setDoctor(''); // Reset doctor when specialization changes
                  setAvailableTimes([]); // Reset available times
                }}
                title={spec}
              />
            ))}
          </Menu>
        </Card.Content>
      </Card>

      {/* Doctor Field */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Doctor</Text>
          <TextInput
            mode="outlined"
            value={doctor}
            onChangeText={setDoctor}
            style={styles.input}
            placeholder="Select or type doctor"
            onFocus={() => setDoctorMenuVisible(true)}
          />
          <Menu
            visible={doctorMenuVisible}
            onDismiss={() => setDoctorMenuVisible(false)}
            anchor={
              <Button mode="text" onPress={() => setDoctorMenuVisible(true)}>
                Select Doctor
              </Button>
            }
          >
            {filteredDoctors.map((doc) => (
              <Menu.Item
                key={doc.name}
                onPress={() => {
                  setDoctor(doc.name);
                  setDoctorMenuVisible(false);
                  setAvailableTimes([]); // Reset time slots when doctor changes
                }}
                title={doc.name}
              />
            ))}
          </Menu>
        </Card.Content>
      </Card>

      {/* Appointment Date Field */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Appointment Date</Text>
          <TextInput
            mode="outlined"
            value={date.toISOString().split('T')[0]}
            onFocus={() => setShowDatePicker(true)}
            style={styles.input}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </Card.Content>
      </Card>

      {/* Visit Time Field */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Visit Time</Text>
          <TextInput
            mode="outlined"
            value={time}
            onFocus={() => setShowTimePicker(true)}
            style={styles.input}
            placeholder="Select time slot"
          />
          <Menu
            visible={showTimePicker}
            onDismiss={() => setShowTimePicker(false)}
            anchor={
              <Button mode="text" onPress={() => setShowTimePicker(true)}>
                Select Time
              </Button>
            }
          >
            {availableTimes.map((slot) => (
              <Menu.Item
                key={slot}
                onPress={() => {
                  setTime(slot);
                  setShowTimePicker(false);
                }}
                title={slot}
              />
            ))}
          </Menu>
        </Card.Content>
      </Card>

      {/* Appointment Type Field */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Type of Appointment</Text>
          <TextInput
            mode="outlined"
            value={appointmentType}
            onFocus={() => setAppointmentTypeMenuVisible(true)}
            onChangeText={setAppointmentType}
            style={styles.input}
            placeholder="Select or type appointment type"
          />
          <Menu
            visible={appointmentTypeMenuVisible}
            onDismiss={() => setAppointmentTypeMenuVisible(false)}
            anchor={
              <Button mode="text" onPress={() => setAppointmentTypeMenuVisible(true)}>
                Select Appointment Type
              </Button>
            }
          >
            {appointmentTypes.map((type) => (
              <Menu.Item
                key={type}
                onPress={() => {
                  setAppointmentType(type);
                  setAppointmentTypeMenuVisible(false);
                }}
                title={type}
              />
            ))}
          </Menu>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSaveChanges}>
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default EditAppointment;
