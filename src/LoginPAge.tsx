
// import React, { useState } from 'react';
// import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
// import { Button, Snackbar } from 'react-native-paper';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Validation schema
// const schema = yup.object({
//     email: yup
//         .string()
//         .email('Invalid email address')
//         .required('Email is required')
//         .test('domain', 'Email domain must be gmail.com', (value) => {
//             return value?.endsWith('@gmail.com');
//         }),
//     password: yup
//         .string()
//         .required('Password is required')
//         .min(6, 'Password must be at least 6 characters long')
//         .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//         .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
// });

// type FormData = {
//     email: string;
//     password: string;
// };

// export default function LoginScreen() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [snackbarVisible, setSnackbarVisible] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

//     const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//         if (data.email.endsWith('@gmail.com')) {
//             setSnackbarMessage('Login successful!');
//             setSnackbarType('success');
//         } else {
//             setSnackbarMessage('Invalid email domain!');
//             setSnackbarType('error');
//         }
//         setSnackbarVisible(true);
//     };

//     return (
//         <View style={styles.container}>
//             {/* Icon for app name */}
//             <View style={styles.iconContainer}>
//                 <Icon name="stethoscope" size={60} color="#2f4858" />
//                 <Text style={styles.appName}>Patient Centric</Text>
//             </View>

//             <View style={styles.content}>
//                 <Text style={styles.welcomeText}>Hi, Welcome Back!</Text>
//                 <Text style={styles.subtitle}>Hope you’re doing fine.</Text>

//                 {/* Email Field */}
//                 <Controller
//                     control={control}
//                     name="email"
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <TextInput
//                             style={[styles.inputField, errors.email && styles.errorInput]}
//                             placeholder="Your Email"
//                             keyboardType="email-address"
//                             onBlur={onBlur}
//                             onChangeText={onChange}
//                             value={value}
//                         />
//                     )}
//                 />
//                 {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//                 {/* Password Field */}
//                 <Controller
//                     control={control}
//                     name="password"
//                     render={({ field: { onChange, onBlur, value } }) => (
//                         <View style={styles.passwordContainer}>
//                             <TextInput
//                                 style={[styles.inputField, errors.password && styles.errorInput]}
//                                 placeholder="Password"
//                                 secureTextEntry={!showPassword}
//                                 onBlur={onBlur}
//                                 onChangeText={onChange}
//                                 value={value}
//                             />
//                             <TouchableOpacity
//                                 style={styles.eyeIcon}
//                                 onPress={() => setShowPassword(!showPassword)}
//                             >
//                                 <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#888" />
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 />
//                 {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

//                 <Button mode="contained" style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
//                     Login 
//                 </Button>

//                 <Text style={styles.orText}>or</Text>

//                 <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
//                     <Icon name="google" size={24} color="#2f4858" style={styles.socialIcon} />
//                     <Text style={styles.socialButtonText}>Sign In with Google</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={() => {}}>
//                     <Text style={styles.forgotPassword}>Forgot password?</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.signUpText}>
//                     Don’t have an account yet?{' '}
//                     <Text style={styles.signUpLink} onPress={() => {}}>
//                         Sign up
//                     </Text>
//                 </Text>
//             </View>

//             {/* Snackbar for feedback */}
//             <Snackbar
//                 visible={snackbarVisible}
//                 onDismiss={() => setSnackbarVisible(false)}
//                 style={snackbarType === 'success' ? styles.successSnackbar : styles.errorSnackbar}
//                 duration={3000}
//             >
//                 {snackbarMessage}
//             </Snackbar>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//         alignItems: 'center',
//     },
//     iconContainer: {
//         marginTop: 40,
//         alignItems: 'center',
//     },
//     appName: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: '#2f4858',
//         marginVertical: 12,
//     },
//     content: {
//         width: '90%',
//         marginTop: 20,
//         padding: 20,
//         backgroundColor: '#ffffff',
//         borderRadius: 12,
//         elevation: 4,
//     },
//     welcomeText: {
//         fontSize: 22,
//         color: '#2f4858',
//         textAlign: 'center',
//     },
//     subtitle: {
//         fontSize: 14,
//         color: '#888888',
//         textAlign: 'center',
//         marginVertical: 8,
//     },
//     inputField: {
//         width: '100%',
//         padding: 12,
//         marginVertical: 8,
//         borderWidth: 1,
//         borderColor: '#dddddd',
//         borderRadius: 8,
//         fontSize: 14,
//     },
//     passwordContainer: {
//         position: 'relative',
//         width: '100%',
//     },
//     eyeIcon: {
//         position: 'absolute',
//         right: 12,
//         top: 14,
//     },
//     errorInput: {
//         borderColor: 'red',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginBottom: 8,
//     },
//     signInButton: {
//         backgroundColor: '#2f4858',
//         marginVertical: 8,
//     },
//     orText: {
//         textAlign: 'center',
//         fontSize: 14,
//         color: '#888888',
//         marginVertical: 12,
//     },
//     socialButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 12,
//         marginVertical: 6,
//         borderWidth: 1,
//         borderColor: '#dddddd',
//         borderRadius: 8,
//         backgroundColor: '#ffffff',
//     },
//     socialIcon: {
//         marginRight: 8,
//     },
//     socialButtonText: {
//         fontSize: 14,
//         color: '#2f4858',
//     },
//     forgotPassword: {
//         marginTop: 16,
//         fontSize: 14,
//         color: '#2f4858',
//         textAlign: 'center',
//     },
//     signUpText: {
//         marginTop: 16,
//         fontSize: 14,
//         textAlign: 'center',
//     },
//     signUpLink: {
//         color: '#2f4858',
//         fontWeight: 'bold',
//     },
//     successSnackbar: {
//         backgroundColor: '#4CAF50',
//     },
//     errorSnackbar: {
//         backgroundColor: '#F44336',
//     },
// });

// LoginPAge.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Import the named export for RootStackParamList
import { RootStackParamList } from '../App'; 

// Validation schema
const schema = yup.object({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required')
        .test('domain', 'Email domain must be gmail.com', (value) => {
            return value?.endsWith('@gmail.com');
        }),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

type FormData = {
    email: string;
    password: string;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>; // Correct type for navigation

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const onSubmit = (data: FormData) => {
        console.log(data);

        if (data.email.endsWith('@gmail.com')) {
            setSnackbarMessage('Login successful!');
            setSnackbarType('success');
            navigation.navigate('Dashboard');
        } else {
            setSnackbarMessage('Invalid email domain!');
            setSnackbarType('error');
        }

        setSnackbarVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name="stethoscope" size={60} color="#2f4858" />
                <Text style={styles.appName}>Patient Centric</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.welcomeText}>Hi, Welcome Back!</Text>
                <Text style={styles.subtitle}>Hope you’re doing fine.</Text>

                {/* Email Field */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.inputField, errors.email && styles.errorInput]}
                            placeholder="Your Email"
                            keyboardType="email-address"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                {/* Password Field */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.inputField, errors.password && styles.errorInput]}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon name={showPassword ? "eye" : "eye-off"} size={20} color="#888" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                <Button mode="contained" style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
                    Login 
                </Button>

                <Text style={styles.orText}>or</Text>

                <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                    <Icon name="google" size={24} color="#2f4858" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Sign In with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>

                <Text style={styles.signUpText}>
                    Don’t have an account yet?{' '}
                    <Text style={styles.signUpLink} onPress={() => {}}>
                        Login
                    </Text>
                </Text>
            </View>

            {/* Snackbar for feedback */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                style={snackbarType === 'success' ? styles.successSnackbar : styles.errorSnackbar}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    // Styles here (same as previously provided)


    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    iconContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2f4858',
        marginVertical: 12,
    },
    content: {
        width: '90%',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        elevation: 4,
    },
    welcomeText: {
        fontSize: 22,
        color: '#2f4858',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#888888',
        textAlign: 'center',
        marginVertical: 8,
    },
    inputField: {
        width: '100%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        fontSize: 14,
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 14,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
    signInButton: {
        backgroundColor: '#2f4858',
        marginVertical: 8,
    },
    orText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888888',
        marginVertical: 12,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    socialIcon: {
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#2f4858',
    },
    forgotPassword: {
        marginTop: 16,
        fontSize: 14,
        color: '#2f4858',
        textAlign: 'center',
    },
    signUpText: {
        marginTop: 16,
        fontSize: 14,
        textAlign: 'center',
    },
    signUpLink: {
        color: '#2f4858',
        fontWeight: 'bold',
    },
    successSnackbar: {
        backgroundColor: '#4CAF50',
    },
    errorSnackbar: {
        backgroundColor: '#F44336',
    },
});
