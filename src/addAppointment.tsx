// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Text, Button, IconButton } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';

// type RootStackParamList = {
//   AddAppointment: { newAppointment?: Appointment } | undefined;
//   BookAppointment: undefined;
// };

// type AddAppointmentScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'AddAppointment'
// >;

// type AddAppointmentScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'AddAppointment'
// >;

// interface Appointment {
//   id: string;
//   doctor: string;
//   date: string;
//   time: string;
//   hospital: string;
//   reason: string;
//   name: string;
//   contact: string;
// }

// interface AddAppointmentProps {
//   navigation: AddAppointmentScreenNavigationProp;
//   route: AddAppointmentScreenRouteProp;
// }

// const AddAppointment: React.FC<AddAppointmentProps> = ({ navigation, route }) => {
//   const [appointment, setAppointment] = useState<Appointment | null>(null);

//   useEffect(() => {
//     if (route.params?.newAppointment) {
//       setAppointment(route.params.newAppointment);
//     }
//   }, [route.params]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <IconButton
//           icon="arrow-left"
//           size={30}
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//           iconColor="#fff"
//         />
//         <Text variant="headlineMedium" style={styles.headerText}>
//           Appointments
//         </Text>
//       </View>

//       <View style={styles.content}>
//         {appointment ? (
//           <View style={styles.appointmentDetails}>
//             <Text variant="bodyLarge" style={styles.text}>
//               Appointment with Dr. {appointment.doctor}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Date: {appointment.date}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Time: {appointment.time}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Hospital: {appointment.hospital}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Reason: {appointment.reason}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Patient Name: {appointment.name}
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Contact: {appointment.contact}
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.emptyState}>
//             <IconButton
//               icon="calendar"
//               size={100}
//               iconColor="#74C365"
//               style={styles.icon}
//             />
//             <Text variant="bodyLarge" style={styles.text}>
//               You haven’t booked any appointments yet
//             </Text>
//             <Text variant="bodyMedium" style={styles.text}>
//               Start by looking for doctors near you, read patient stories and
//               book appointments
//             </Text>
//             <Button
//               mode="contained"
//               onPress={() => navigation.navigate('BookAppointment')}
//               style={styles.button}
//             >
//               Book Now
//             </Button>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#2f4858',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     flex: 1,
//     fontSize: 20,
//     color: '#fff',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyState: {
//     alignItems: 'center',

//     justifyContent: 'center',
//   },
//   appointmentDetails: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   icon: {
//     marginBottom: 20,
//   },
//   text: {
//     color: '#666',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   button: {
//     marginTop: 20,
//     paddingHorizontal: 30,
//     backgroundColor: '#2f4858',
//   },
// });

// export default AddAppointment;



import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, IconButton, Avatar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  AddAppointment: { newAppointment?: Appointment } | undefined;
  BookAppointment: undefined;
  ViewAppointment: { appointment: Appointment };
  EditAppointment: { appointment: Appointment };
};

type AddAppointmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddAppointment'
>;

type AddAppointmentScreenRouteProp = RouteProp<
  RootStackParamList,
  'AddAppointment'
>;

interface Appointment {
  id: string;
  doctor: string;
  date: string;
  time: string;
  hospital: string;
  reason: string;
  name: string;
  contact: string;
}

interface AddAppointmentProps {
  navigation: AddAppointmentScreenNavigationProp;
  route: AddAppointmentScreenRouteProp;
}

const AddAppointment: React.FC<AddAppointmentProps> = ({ navigation, route }) => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (route.params?.newAppointment) {
      setAppointment(route.params.newAppointment);
    }
  }, [route.params]);

  const handleDelete = () => {
    // Delete functionality here (e.g., call an API to delete the appointment)
    alert('Appointment deleted');
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          iconColor="#fff"
        />
        <Text variant="headlineMedium" style={styles.headerText}>
          Appointments
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('BookAppointment')}
          style={styles.bookButton}
        >
          Book Another Appointment
        </Button>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {appointment ? (
          <View style={styles.appointmentCard}>
            <View style={styles.cardLeft}>
              <Avatar.Icon size={60} icon="account" style={styles.avatar} />
              <View style={styles.cardText}>
                <Text variant="bodyLarge" style={styles.text}>
                  Dr. {appointment.doctor}
                </Text>
                <Text variant="bodyMedium" style={styles.text}>
                  {appointment.date} - {appointment.time}
                </Text>
              </View>
            </View>

            <View style={styles.cardRight}>
              <IconButton
                icon="eye"
                size={20}
                onPress={() => navigation.navigate('ViewAppointment', { appointment })}
                style={styles.icon}
              />
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => navigation.navigate('EditAppointment', { appointment })}
                style={styles.icon}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={handleDelete}
                style={styles.icon}
              />
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <IconButton
              icon="calendar"
              size={100}
              iconColor="#74C365"
              style={styles.icon}
            />
            <Text variant="bodyLarge" style={styles.text}>
              You haven’t booked any appointments yet
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              Start by looking for doctors near you, read patient stories and
              book appointments
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('BookAppointment')}
              style={styles.button}
            >
              Book Now
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#2f4858',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#74C365',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 15,
  },
  avatar: {
    backgroundColor: '#74C365',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: '#666',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 30,
    backgroundColor: '#2f4858',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddAppointment;
