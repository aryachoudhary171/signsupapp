import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';

const ViewAppointment = ({ route, navigation }: { route: any; navigation: any }) => {
  const { appointmentId } = route.params;

  return (
    <View style={styles.container}>
      {/* Calendar Icon */}
      <View style={styles.header}>
        <IconButton
          icon="calendar"
          size={50}
          iconColor="#4A90E2"
          style={styles.calendarIcon}
        />
        <Text style={styles.dayText}>{new Date(appointmentId.date).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
      </View>

      {/* Appointment Details */}
      <Card style={[styles.card, styles.blueBorder]}>
        <Card.Content>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>
            {appointmentId.date} | {appointmentId.time}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.blueBorder]}>
        <Card.Content>
         
          <Text style={styles.doctorName}>{appointmentId.doctor}</Text>
          <Text style={styles.value}>{appointmentId.spec}</Text>
        </Card.Content>
      </Card>

      {/* Back Button */}
      <Button
        mode="contained"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        Back to Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarIcon: {
    marginRight: 10,
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#281E5D',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
  },
  blueBorder: {
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#281E5D',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#281E5D',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default ViewAppointment;