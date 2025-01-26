import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Card, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For the envelope icon

const VerifyEmailScreen = ({ navigation, route }: any) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleContinue = () => {
    if (verificationCode) {
      // Show Snackbar on successful signup
      setSnackbarVisible(true);

      // Navigate to LoginPage after a short delay
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    } else {
      alert('Please enter the verification code.');
    }
  };

  const handleResendEmail = () => {
    // Resend verification email logic here
    alert('Verification code resent to your email.');
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Back Button and Tab Text */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#081C05" />
        </TouchableOpacity>
        <Text style={styles.tabText}>Verify Email</Text>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <Icon name="stethoscope" size={80} color="#2f4858" />
        <Text style={styles.logoText}>PatientCentric</Text>
      </View>

      {/* Form Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Check your inbox</Text>
          <Text style={styles.subtitle}>
            Enter the verification code we just sent to {route.params?.email}
          </Text>

          {/* Verification Code Input */}
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
            keyboardType="numeric"
          />

          {/* Continue Button */}
          <Button mode="contained" style={styles.button} onPress={handleContinue}>
            Submit
          </Button>

          {/* Resend Email */}
          <TouchableOpacity onPress={handleResendEmail}>
            <Text style={styles.resendText}>Resend email</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
        style={styles.snackbar}>
        Signup successful!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    paddingTop: 20,
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
    color: '#2f4858',
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
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f4858',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
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
  resendText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#081C05',
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#4CAF50', // Success green color for snackbar
  },
});

export default VerifyEmailScreen;
