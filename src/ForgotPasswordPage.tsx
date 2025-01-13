import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address') // Basic email format check
    .test('domain-check', 'Email must be from specific domains (gmail.com, yahoo.com)', (value) => {
      // Check if value is not undefined before proceeding
      if (value) {
        const allowedDomains = ['gmail.com', 'yahoo.com']; // Define allowed domains
        const domain = value.split('@')[1]; // Get domain part of email
        return allowedDomains.includes(domain); // Check if email domain is in allowed domains
      }
      return false; // Return false if value is undefined or empty
    })
    .required('Email is required'),
});

const ForgotPasswordPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePasswordReset = (data: { email: string }) => {
    // Logic to send password reset request here
    alert('Password reset instructions sent to your email');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <TextInput
                label="Email"
                value={value || ''}  /* Ensure value is never undefined */
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
          );
        }}
      />

      <Button mode="contained" onPress={handleSubmit(handlePasswordReset)} style={styles.button}>
        Reset Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
});

export default ForgotPasswordPage;