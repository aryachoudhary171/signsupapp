import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For the stethoscope icon

const SignupPage = ({ navigation, route }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const handleContinue = () => {
    if (email && password) {
      navigation.navigate('VerifyEmailScreen', { email });
    } else {
      alert('Please enter your email and password.');
    }
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
        <Icon name="stethoscope" size={80} color="#2f4858" />
        <Text style={styles.logoText}>PatientCentric</Text>
      </View>

      {/* Form Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create your account to get started!</Text>

          {/* Email Field */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          {/* Password Field */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
                onPress={() => setShowPassword(!showPassword)}

              />
            }
          />

          {/* Continue Button */}
          <Button mode="contained" style={styles.button} onPress={handleContinue}>
            Continue
          </Button>

          {/* Go Back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go back</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
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
  goBackText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#081C05',
    fontWeight: 'bold',
  },
});

export default SignupPage;
