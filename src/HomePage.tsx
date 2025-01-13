import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Card, IconButton } from 'react-native-paper';

const HomePage = ({ route, navigation }: { route: any; navigation: any }) => {
  const [appointments, setAppointments] = useState([
    { id: '1', doctor: 'Dr. Wagh', date: '2025-01-10', time: '10:00 AM', spec: 'Cardiologist' },
    { id: '2', doctor: 'Dr. Sharma', date: '2025-01-12', time: '2:00 PM', spec: 'Dentist' },
    { id: '3', doctor: 'Dr. Pukale', date: '2025-01-15', time: '11:30 AM', spec: 'Orthopedic' },
  ]);

  // Add new appointment to the state
  const handleAddAppointment = (newAppointment: any) => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };

  // If a new appointment or an updated appointment is passed from the BookAppointment or EditAppointment screen, update the state
  useEffect(() => {
    if (route.params?.newAppointment) {
      handleAddAppointment(route.params.newAppointment);
    }

    // If an updated appointment is passed, update the relevant appointment
    if (route.params?.updatedAppointment) {
      const updatedAppointment = route.params.updatedAppointment;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === updatedAppointment.id ? updatedAppointment : appointment
        )
      );
    }
  }, [route.params?.newAppointment, route.params?.updatedAppointment]);

  const handleDelete = (appointmentId: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const renderAppointment = ({ item }: { item: any }) => (
    <Card style={styles.appointmentCard}>
      <IconButton
        icon="delete"
        size={17}
        iconColor="red"
        style={styles.deleteIcon}
        onPress={() => handleDelete(item.id)} // Delete appointment
      />
      <Card.Content>
        <Text style={styles.appointmentDoctor}>{item.doctor}</Text>
        <Text style={styles.appointmentDate}>Specialization: {item.spec}</Text>
        <Text style={styles.appointmentTime}>Date: {item.date} | Time: {item.time}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate('ViewAppointment', { appointmentId: item })}
          >
            View
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => navigation.navigate('EditAppointment', { appointmentId: item })}
          >
            Edit
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bookButtonContainer}>
        <Button
          mode="contained"
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookAppointment', { addAppointment: handleAddAppointment })}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </Button>
      </View>

      <View style={styles.appointmentsContainer}>
        <Text style={styles.title}>My Appointments</Text>
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 10,
  },
  bookButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 2,
    paddingHorizontal: 2,
    height: 40,
    minWidth: 120,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  appointmentsContainer: {
    flex: 1,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
  },
  appointmentCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    padding: 10,
    position: 'relative',
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#777',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default HomePage;
