import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>(); // Use generic NavigationProp type

  const handleNavigate = () => {
    navigation.navigate('SignupScreen'); // Navigate to the Signup screen
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/doc.jpeg')} // Replace with your image path
        style={styles.image}
      />
      
      {/* Main Heading */}
      <Text style={styles.text}>Connect with Specialist</Text>
      
      {/* Subheading */}
      <Text style={styles.itemtext}>
        Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultation.
      </Text>
      
      {/* Button */}
      <Button mode="contained" 
      onPress={handleNavigate} 
      style={styles.button}
      buttonColor= "#1C2A3A"
       > Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Optional: Add background color for consistency
  },
  image: {
    width: '180%', // Reduce width for proper alignment
    height: '70%', // Adjust height for balance
    resizeMode: 'contain', // Maintain aspect ratio
    marginBottom: 30, // Add spacing below the image
  },
  text: {
    fontSize: 24, // Slightly larger font for the main heading
    fontWeight: 'bold',
    marginBottom: 10, // Consistent spacing below the heading
    textAlign: 'center',
  },
  itemtext: {
    fontSize: 16, // Slightly larger font for readability
    color: 'grey',
    textAlign: 'center', // Center-align text for consistency
    marginHorizontal: 10, // Add padding for text alignment
    marginBottom: 30, // Add spacing below the subheading
    lineHeight: 22, // Improve readability with line height
  },
  button: {
    marginTop: 10, // Adjust spacing for visual balance
    paddingHorizontal: 20, // Optional: Add padding to button
    
  },
});

export default HomeScreen;
