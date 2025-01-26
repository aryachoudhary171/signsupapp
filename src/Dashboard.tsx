// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import { Text, TextInput, Card, Avatar } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import AddAppointment from './addAppointment';

// // Custom Drawer Content
// const CustomDrawerContent = (props: any) => {
//   const { navigation } = props;

//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerHeader}>
//         <Avatar.Text
//           size={60}
//           label="VB" // Dynamic initials (replace "VB" with state/props if needed)
//           style={styles.drawerAvatar}
//         />
//         <Text style={styles.drawerName}>Vrunda Bohra</Text>
//       </View>
//       <DrawerItem
//         label="Profile"
//         icon={() => <Icon name="account" size={24} />}
//         onPress={() => navigation.navigate('Profile')}
//       />
//       <DrawerItem
//         label="Appointments"
//         icon={() => <Icon name="calendar-check" size={24} />}
//         onPress={() => navigation.navigate('AddAppointment')}
//       />
//       <DrawerItem
//         label="Reports"
//         icon={() => <Icon name="file-document-outline" size={24} />}
//         onPress={() => navigation.navigate('Reports')}
//       />
//       <DrawerItem
//         label="Logout"
//         icon={() => <Icon name="logout" size={24} />}
//         onPress={() => {
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Login' }],
//           });
//         }}
//       />
//     </DrawerContentScrollView>
//   );
// };

// // Dashboard Component
// const Dashboard = ({ navigation }: { navigation: any }) => {
//   const [userInitial, setUserInitial] = useState('');
//   const [userName, setUserName] = useState({ firstName: '', lastName: '' });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = {
//         firstName: 'Vrunda',
//         lastName: 'Bohra',
//       };

//       setUserName(userData);
//       const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
//       setUserInitial(initials);
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.headerSection}>
//         <TouchableOpacity
//           style={styles.profileIcon}
//           onPress={() => navigation.openDrawer()} // Open Drawer
//         >
//           <Avatar.Text
//             size={40}
//             label={userInitial || 'NN'}
//             style={styles.avatar}
//             labelStyle={{ color: '#fff' }}
//           />
//         </TouchableOpacity>
//         <TextInput
//           style={[styles.searchBar, { borderColor: '#081C05', borderWidth: 1 }]}
//           placeholder="Search for specialists or clinics"
//           right={<TextInput.Icon icon="magnify" />}
//         />
//       </View>

//       {/* Main Banner Section */}
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/female_doctor.png')}
//           style={styles.headerImage}
//           resizeMode="cover"
//         />
//         <Text variant="titleLarge" style={styles.headerTitle}>
//           Looking for Specialist Doctors?
//         </Text>
//         <Text variant="bodyMedium" style={styles.headerSubtitle}>
//           Schedule an appointment with our top doctors.
//         </Text>
//       </View>

//       {/* Categories Section */}
//       <View style={styles.section}>
//         <Text variant="titleMedium" style={styles.sectionTitle}>
//           Categories
//         </Text>
//         <View style={styles.categories}>
//           {[
//             { name: 'Dentistry', icon: 'tooth-outline', color: '#FFD7D7' },
//             { name: 'Cardiology', icon: 'heart-outline', color: '#D7FFD7' },
//             { name: 'Pulmonology', icon: 'lungs', color: '#FFD7F3' },
//             { name: 'General', icon: 'account-outline', color: '#D7E8FF' },
//             { name: 'Neurology', icon: 'brain', color: '#E8D7FF' },
//             { name: 'Gastro.', icon: 'stomach', color: '#D7FFF3' },
//             { name: 'Laboratory', icon: 'flask-outline', color: '#FFF7D7' },
//             { name: 'Vaccination', icon: 'needle', color: '#D7F7FF' },
//           ].map((category, index) => (
//             <View
//               key={index}
//               style={[styles.categoryItem, { backgroundColor: category.color }]}
//             >
//               <Icon
//                 name={category.icon}
//                 size={30}
//                 color="#000"
//                 style={styles.categoryIcon}
//               />
//               <Text variant="bodySmall" style={styles.categoryText}>
//                 {category.name}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Nearby Medical Centers Section */}
//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <Text variant="titleMedium" style={styles.sectionTitle}>
//             Nearby Medical Centers
//           </Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAll}>See All</Text>
//           </TouchableOpacity>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {[
//             {
//               name: 'Sunrise Health Clinic',
//               image: require('../assets/clinic1.png'),
//             },
//             {
//               name: 'Golden Cardiology Center',
//               image: require('../assets/clinic1.png'),
//             },
//             {
//               name: 'Wellness Hospital',
//               image: require('../assets/clinic1.png'),
//             },
//           ].map((center, index) => (
//             <Card key={index} style={styles.medicalCenterCard}>
//               <Card.Cover source={center.image} style={styles.cardImage} />
//               <Card.Content>
//                 <Text variant="bodyMedium" style={styles.cardTitle}>
//                   {center.name}
//                 </Text>
//               </Card.Content>
//             </Card>
//           ))}
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// };

// // Individual Screens
// const ProfileScreen = () => <Text>Profile Screen</Text>;
// const ReportsScreen = () => <Text>Reports Screen</Text>;
// const LoginScreen = () => <Text>Login Screen</Text>;

// // Drawer Navigator with Screens
// const Drawer = createDrawerNavigator();

// const DashboardWithDrawer = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: { backgroundColor: '#f5f5f5', width: 250 },
//       }}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Dashboard" component={Dashboard} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="AddAppointment" component={AddAppointment} />
//       <Drawer.Screen name="Reports" component={ReportsScreen} />
//       <Drawer.Screen name="Login" component={LoginScreen} />
//     </Drawer.Navigator>
//   );
// };

// export default DashboardWithDrawer;

// // Styles
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1,
//      backgroundColor: '#fff'
//      },
//   headerSection: {
//      flexDirection: 'row',
//       alignItems: 'center',
//        padding: 16 
//       },
//   profileIcon: {
//      marginRight: 8
//      },
//   avatar: { 
//     backgroundColor: '#081C05'
//    },
//   searchBar: {
//      backgroundColor: '#fff', 
//      flex: 1, height: 40, 
//      fontSize: 16
//      },
//   header: {
//      padding: 16,
//       alignItems: 'center'
//      },
//   headerImage: {
//      width: '100%',
//       height: 200,
//        borderRadius: 8,
//         marginBottom: 16 
//       },
//   headerTitle: { 
//     fontWeight: 'bold', 
//     marginBottom: 4, 
//     textAlign: 'center'
//    },
//   headerSubtitle: {
//      textAlign: 'center'
//      },
//   section: { marginVertical: 16,
//      paddingHorizontal: 16 
//     },
//   sectionTitle: { 
//     fontWeight: 'bold',
//     marginBottom: 8
//    },
//   sectionHeader: { 
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//    },
//   seeAll: { 
//     color: '#007bff',
//      fontWeight: 'bold',
//      marginBottom: 4
//      },
//   categories: {
//      flexDirection: 'row',
//      flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     alignItems: 'center',
  
//   },
//   categoryItem: { 
//     width: '22%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//     padding: 10, 
//     borderRadius: 12,
//     elevation: 3 
//     },
//   categoryIcon: { 
//     marginBottom: 8
//    },
//   categoryText: {
//      fontSize: 12, 
//      fontWeight: 'bold', 
//      textAlign: 'center' 
//     },
//   medicalCenterCard: { 
//     width: 150,
//      marginRight: 16 ,
//     elevation: 3
//     },
//   cardImage: { 
//     height: 100 
//   },
//   cardTitle: {
//      fontWeight: 'bold',
//       textAlign: 'center',
//        marginTop: 8 
//       },
//   drawerHeader: { 
//     alignItems: 'center',
//      padding: 20,
//       backgroundColor:
//        '#081C05' 
//       },
//   drawerAvatar: {
//      backgroundColor: '#4caf50'
//      },
//   drawerName: { 
//     color: '#fff',
//      marginTop: 10,
//       fontWeight: 'bold', 
//       fontSize: 18 
//     },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Card, Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AddAppointment from './addAppointment'; // Import the AddAppointment component
import BookAppointment from './BookAppointment'; // Import BookAppointment component
import ProfileScreen from './Profile';

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar.Text
          size={60}
          label="VB" // Dynamic initials (replace "VB" with state/props if needed)
          style={styles.drawerAvatar}
        />
        <Text style={styles.drawerName}>Vrunda Bohra</Text>
      </View>
      <DrawerItem
        label="Profile"
        icon={() => <Icon name="account" size={24} />}
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <DrawerItem
        label="Appointments"
        icon={() => <Icon name="calendar-check" size={24} />}
        onPress={() => navigation.navigate('AddAppointment')}
      />
      <DrawerItem
        label="Reports"
        icon={() => <Icon name="file-document-outline" size={24} />}
        onPress={() => navigation.navigate('Reports')}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Icon name="logout" size={24} />}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </DrawerContentScrollView>
  );
};

// Dashboard Component
const Dashboard = ({ navigation }: { navigation: any }) => {
  const [userInitial, setUserInitial] = useState('');
  const [userName, setUserName] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        firstName: 'Vrunda',
        lastName: 'Bohra',
      };

      setUserName(userData);
      const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
      setUserInitial(initials);
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.openDrawer()} // Open Drawer
        >
          <Avatar.Text
            size={40}
            label={userInitial || 'NN'}
            style={styles.avatar}
            labelStyle={{ color: '#fff' }}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchBar, { borderColor: '#081C05', borderWidth: 1 }]}
          placeholder="Search for specialists or clinics"
          right={<TextInput.Icon icon="magnify" />}
        />
      </View>

      {/* Main Banner Section */}
      <View style={styles.header}>
        <Image
          source={require('../assets/female_doctor.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <Text variant="titleLarge" style={styles.headerTitle}>
          Looking for Specialist Doctors?
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Schedule an appointment with our top doctors.
        </Text>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Categories
        </Text>
        <View style={styles.categories}>
          {[ 
            { name: 'Dentistry', icon: 'tooth-outline', color: '#FFD7D7' }, 
            { name: 'Cardiology', icon: 'heart-outline', color: '#D7FFD7' },
            { name: 'Pulmonology', icon: 'lungs', color: '#FFD7F3' }, 
            { name: 'General', icon: 'account-outline', color: '#D7E8FF' },
            { name: 'Neurology', icon: 'brain', color: '#E8D7FF' }, 
            { name: 'Gastro.', icon: 'stomach', color: '#D7FFF3' },
            { name: 'Laboratory', icon: 'flask-outline', color: '#FFF7D7' },
            { name: 'Vaccination', icon: 'needle', color: '#D7F7FF' }
          ].map((category, index) => (
            <View
              key={index}
              style={[styles.categoryItem, { backgroundColor: category.color }]}
            >
              <Icon
                name={category.icon}
                size={30}
                color="#000"
                style={styles.categoryIcon}
              />
              <Text variant="bodySmall" style={styles.categoryText}>
                {category.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Nearby Medical Centers Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Nearby Medical Centers
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[ 
            { name: 'Sunrise Health Clinic', image: require('../assets/clinic1.png') },
            { name: 'Golden Cardiology Center', image: require('../assets/clinic1.png') },
            { name: 'Wellness Hospital', image: require('../assets/clinic1.png') }
          ].map((center, index) => (
            <Card key={index} style={styles.medicalCenterCard}>
              <Card.Cover source={center.image} style={styles.cardImage} />
              <Card.Content>
                <Text variant="bodyMedium" style={styles.cardTitle}>
                  {center.name}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// Profile Screen

// Reports Screen
const ReportsScreen = () => <Text>Reports Screen</Text>;

// Login Screen
const LoginScreen = () => <Text>Login Screen</Text>;

// Drawer Navigator with Screens
const Drawer = createDrawerNavigator();

const DashboardWithDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#f5f5f5', width: 250 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="AddAppointment" component={AddAppointment} />
      <Drawer.Screen name="BookAppointment" component={BookAppointment} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardWithDrawer;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerSection: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  profileIcon: { marginRight: 8 },
  avatar: { backgroundColor: '#081C05' },
  searchBar: { backgroundColor: '#fff', flex: 1, height: 40, fontSize: 16 },
  header: { padding: 16, alignItems: 'center' },
  headerImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  headerTitle: { fontWeight: 'bold', marginBottom: 4, textAlign: 'center' },
  headerSubtitle: { textAlign: 'center' },
  section: { marginVertical: 16, paddingHorizontal: 16 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { color: '#007bff', fontWeight: 'bold', marginBottom: 4 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' },
  categoryItem: { width: '22%', alignItems: 'center', justifyContent: 'center', marginBottom: 16, padding: 10, borderRadius: 12, elevation: 3 },
  categoryIcon: { marginBottom: 8 },
  categoryText: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  medicalCenterCard: { width: 150, marginRight: 16, elevation: 3 },
  cardImage: { height: 100 },
  cardTitle: { fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  drawerHeader: { alignItems: 'center', padding: 20, backgroundColor: '#081C05' },
  drawerAvatar: { backgroundColor: '#4caf50' },
  drawerName: { color: '#fff', marginTop: 10, fontWeight: 'bold', fontSize: 18 },
});
