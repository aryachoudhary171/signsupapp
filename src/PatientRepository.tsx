

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, Image } from 'react-native';
import { Button, Card, Title, Menu, IconButton, Snackbar } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { encode } from 'base64-arraybuffer';
import { getPatientDocuments, uploadPatientDocument, deletePatientDocument, downloadPatientDocument } from '../src/services/authservice';
import * as Sharing from 'expo-sharing';

type FileData = {
  id: number;
  fileName: string;
  contentType: string;
  fileContent: Record<string, number>;
  createdAt: string;
};


export default function PatientRepository({ navigation }: { navigation: any }) {
  const [files, setFiles] = useState<FileData[]>([]);
  const [menuVisible, setMenuVisible] = useState<number | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  <View style={styles.container}>
  <Text style={styles.title}>Patient Repository</Text>
</View>


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getPatientDocuments();
        setFiles(data);
      } catch (error: unknown) {
        Alert.alert('Error', error instanceof Error ? error.message : 'Failed to fetch files');
      }
    };
    fetchFiles();
  }, []);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true, // Allow multiple file selection
      });
  
      if (result.canceled) {
        setSnackbarMessage('File selection canceled');
        setSnackbarType('error');
        setSnackbarVisible(true);
        return;
      }
  
      // If files are selected
      if (result.assets?.length > 0) {
        const newFiles = result.assets.map((asset) => ({
          uri: asset.uri,
          fileName: asset.name,
          size: asset.size || 0,
          contentType: asset.mimeType || 'application/octet-stream',
          fileId: Date.now(), // Use unique IDs for each file
          createdAt: new Date().toLocaleString(),
        }));
  
        // Upload files in smaller batches (e.g., 3 files at a time)
        const batchSize = 3;
        for (let i = 0; i < newFiles.length; i += batchSize) {
          const batch = newFiles.slice(i, i + batchSize);
  
          // Upload the current batch concurrently
          const uploadPromises = batch.map((file) => uploadPatientDocument(file));
  
          // Wait for the current batch to finish before uploading the next batch
          await Promise.all(uploadPromises);
        }
  
        setSnackbarMessage('Files uploaded successfully');
        setSnackbarType('success');
        setSnackbarVisible(true);
  
        // Fetch the updated list of files after upload
        setFiles(await getPatientDocuments());
      } else {
        setSnackbarMessage('No files selected');
        setSnackbarType('error');
        setSnackbarVisible(true);
      }
    } catch (error: unknown) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Failed to upload files');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  };

  const handleDeleteFile = async (id: number) => {
    try {
      await deletePatientDocument(id);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
      setSnackbarMessage('File deleted successfully');
      setSnackbarType('success');
      setSnackbarVisible(true);
    } catch (error: unknown) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Failed to delete the file');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  };

  const handlePreviewFile = async (file: FileData) => {
    try {
      const fileBytes = Object.values(file.fileContent);
      const fileData = new Uint8Array(fileBytes);
      const base64Data = encode(fileData.buffer);

      const localUri = `${FileSystem.cacheDirectory}${file.fileName}`;
      await FileSystem.writeAsStringAsync(localUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      const contentUri = await FileSystem.getContentUriAsync(localUri);
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        type: file.contentType || 'application/octet-stream',
        flags: 1,
      });
    } catch (error: unknown) {
      setSnackbarMessage(error instanceof Error ? `Unable to preview the file: ${error.message}` : 'Unexpected error occurred');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  };

  const handleDownloadFile = async (file: FileData) => {
    try {
      const downloadedFile = await downloadPatientDocument(file.id) as ArrayBuffer | Uint8Array; // Explicit type casting
  
      if (downloadedFile instanceof ArrayBuffer || downloadedFile instanceof Uint8Array) {
        const fileData = new Uint8Array(downloadedFile);
        const base64Data = encode(fileData.buffer);
  
        // Save the file to app's internal document directory
        const fileUri = `${FileSystem.documentDirectory}${file.fileName}`;
  
        await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
  
        // Notify the user
        setSnackbarMessage(`File saved to: ${fileUri}`);
        setSnackbarType('success');
        setSnackbarVisible(true);
  
        // Share the file with other apps (e.g., file manager, email)
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        }
      } else {
        throw new Error('Downloaded file is not in the expected format');
      }
    } catch (error: unknown) {
      setSnackbarMessage(error instanceof Error ? `Unable to download the file: ${error.message}` : 'Unexpected error occurred');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  };
    const openMenu = (id: number) => setMenuVisible(id);
  const closeMenu = () => setMenuVisible(null);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.iconContainer}>
        <Icon name="file-pdf-box" size={60} color="#2f4858" />
        <Text style={styles.appName}>Patient Repository</Text>
      </View>

      <View style={styles.mainContent}>
        {files.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image source={require('../assets/data_found.png')} style={styles.emptyStateImage} />
            <Text style={styles.emptyStateText}>Add a medical record</Text>
            <Text style={styles.emptyStateSubText}>A detailed health history helps a doctor diagnose you better.</Text>
          </View>
        ) : (
          <View style={styles.fileList}>
            <Text style={styles.sectionTitle}>Uploaded Files:</Text>
            {files.map((file) => (
              <Card key={file.id} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Icon name="file-pdf-box" size={24} color="#f44336" style={styles.pdfIcon} />
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{file.fileName}</Text>
                    <Text style={styles.fileTimestamp}>
                      Uploaded on {new Date(file.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <Menu
                    visible={menuVisible === file.id}
                    onDismiss={closeMenu}
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        size={24}
                        onPress={() => openMenu(file.id)}
                        style={{ marginRight: -8 }}
                        iconColor="#2f4858" // Set color for menu button
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        handlePreviewFile(file);
                        closeMenu();
                      }}
                      title={
                        <View style={styles.menuItemContainer}>
                          <IconButton icon="eye" size={20} onPress={() => handlePreviewFile(file)} iconColor="#4caf50" />
                        </View>
                      }
                    />
                    <Menu.Item
                      onPress={() => {
                        handleDownloadFile(file);
                        closeMenu();
                      }}
                      title={
                        <View style={styles.menuItemContainer}>
                          <IconButton icon="download" size={20} onPress={() => handleDownloadFile(file)} iconColor="#2196f3" />
                        </View>
                      }
                    />
                    <Menu.Item
                      onPress={() => {
                        handleDeleteFile(file.id);
                        closeMenu();
                      }}
                      title={
                        <View style={styles.menuItemContainer}>
                          <IconButton icon="delete" size={20} onPress={() => handleDeleteFile(file.id)} iconColor="#f44336" />
                        </View>
                      }
                    />
                  </Menu>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </View>

      <View style={styles.addButtonContainer}>
        <Button mode="contained" onPress={handleFileUpload} style={styles.uploadButton}>
          Add a Record
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: snackbarType === 'success' ? '#4caf50' : '#f44336',
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center', // Center the content horizontally
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2f4858',
  },
  mainContent: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileList: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  fileTimestamp: {
    fontSize: 14,
    color: '#757575',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  addButtonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  uploadButton: {
    width: '100%',
  },


  container: {
    flex: 1, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f4858',
  },


});














