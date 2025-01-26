import axios from 'axios';

const BACKEND_URL = 'http://192.168.103.41:3000'; // Replace with your backend URL

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatientDocuments = async () => {
  try {
    const response = await api.get('/patient-documents');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to fetch patient documents');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const uploadPatientDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('fileContent', {
      uri: file.uri,
      name: file.fileName,
      type: file.contentType,
    } as any);
    formData.append('fileName', String(file.fileName)); // Include the fileId
    formData.append('size', String(file.size));

    const response = await api.post('/patient-documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to upload file');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deletePatientDocument = async (fileName: number) => {
  try {
    const response = await api.delete(`/patient-documents/${fileName}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to delete file');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
// authservice.ts (Download)
export const downloadPatientDocument = async (fileId: number): Promise<ArrayBuffer> => {
  try {
    const response = await api.get(`/patient-documents/download/${fileId}`, {
      responseType: 'arraybuffer', // Ensure the response is an ArrayBuffer
    });
    return response.data; // This should be an ArrayBuffer
  } catch (error) {
    throw new Error('Failed to download file');
  }
};


