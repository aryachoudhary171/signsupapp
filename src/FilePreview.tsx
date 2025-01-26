
import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Platform, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { IconButton } from 'react-native-paper'; // Import IconButton from react-native-paper

const FilePreview = () => {
  const [fileUris, setFileUris] = useState<string[]>([]); // Array to store multiple file URIs

  // Handle selecting multiple files
  const handlePickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true, // Allow multiple file selection
      });

      if (result.canceled) {
        console.log('No file selected');
        return;
      }

      // Extract and store URIs for the selected files
      const uris = result.assets.map((asset) => asset.uri);
      setFileUris(uris);
    } catch (error) {
      console.error('Error picking files:', error);
    }
  };

  // Function to open file using Linking (Universal for Android and iOS)
  const openFile = async (uri: string) => {
    try {
      await Linking.openURL(uri); // Open the file in the default viewer
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Files" onPress={handlePickFiles} />

      {fileUris.length > 0 && (
        <View style={styles.previewContainer}>
          {fileUris.map((uri, index) => (
            <View key={index} style={styles.filePreview}>
              <Text>File {index + 1}: {uri}</Text>
              <IconButton
                icon="eye"
                size={30}
                iconColor="blue"
                onPress={() => openFile(uri)} // Open the file when preview icon is pressed
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewContainer: {
    marginTop: 20,
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  filePreview: {
    marginBottom: 10,
  },
});

export default FilePreview;
