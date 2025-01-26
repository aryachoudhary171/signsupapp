import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Button, Divider, TextInput, Card } from 'react-native-paper';

const ProfileScreen = () => {
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    // Fetch random female avatar URL from randomuser.me
    fetch('https://randomuser.me/api/portraits/women/44.jpg')
      .then(response => response.json())
      .then(data => {
        // Set the URL of the avatar to the state
        setAvatarUrl(data.results[0].picture.large);
      })
      .catch(error => console.error('Error fetching avatar:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{ uri: avatarUrl || 'https://randomuser.me/api/portraits/women/44.jpg' }} // Placeholder if avatarUrl is empty
          style={styles.avatar}
        />
        <Text style={styles.name}>Vrunda Bohra</Text>
        <Text style={styles.subtitle}>Edit your profile details below</Text>
      </View>

      {/* Form Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Divider style={styles.divider} />
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Gender"
            value={gender}
            onChangeText={setGender}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Date of Birth"
            value={dob}
            onChangeText={setDob}
            mode="flat"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Health Information</Text>
          <Divider style={styles.divider} />
          <TextInput
            label="Blood Group"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Marital Status"
            value={maritalStatus}
            onChangeText={setMaritalStatus}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Height (in cm)"
            value={height}
            onChangeText={setHeight}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Weight (in kg)"
            value={weight}
            onChangeText={setWeight}
            mode="flat"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Emergency Details</Text>
          <Divider style={styles.divider} />
          <TextInput
            label="Emergency Contact"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            mode="flat"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      {/* Footer */}
      <Button mode="contained" style={styles.completeButton}>
        Save Changes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f4858',
  },
  subtitle: {
    fontSize: 14,
    color: '#7e7e7e',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2f4858',
  },
  divider: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  completeButton: {
    marginTop: 16,
    backgroundColor: '#2f4858',
  },
});

export default ProfileScreen;
