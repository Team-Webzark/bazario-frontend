import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AccountScreen({ navigation }) {
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => navigation.replace('MobileNumberInput') }
      ]
    );
  };

  const menuItems = [
    { icon: 'location-outline', title: 'Saved Addresses', screen: 'SavedAddresses' },
    { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods' },
    { icon: 'notifications-outline', title: 'Notifications', screen: 'NotificationsSettings' },
    { icon: 'heart-outline', title: 'My Favorites', screen: 'CategoryListing' }, // Example link
    { icon: 'help-circle-outline', title: 'Help & Support', screen: 'IssueReporting' },
    { icon: 'information-circle-outline', title: 'About App', screen: null },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.menuItem}
      onPress={() => item.screen ? navigation.navigate(item.screen) : null}
    >
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
           <Ionicons name={item.icon} size={22} color="#333" />
        </View>
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* User Profile Card */}
        <View style={styles.profileCard}>
           <Image 
             source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} 
             style={styles.avatar} 
           />
           <View style={styles.profileInfo}>
              <Text style={styles.userName}>Shadmaan</Text>
              <Text style={styles.userPhone}>+91 98765 43210</Text>
              <TouchableOpacity style={styles.editBtn}>
                 <Text style={styles.editBtnText}>Edit Profile</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>YOUR ACCOUNT</Text>
          {menuItems.slice(0, 3).map(renderMenuItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>APP SETTINGS</Text>
          {menuItems.slice(3).map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
           <Ionicons name="log-out-outline" size={20} color="#FF4444" />
           <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
        <View style={{ height: 100 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  
  content: { padding: 16 },
  
  profileCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, alignItems: 'center', elevation: 1 },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  userPhone: { fontSize: 14, color: '#666', marginBottom: 8 },
  editBtn: { },
  editBtnText: { color: '#12783D', fontWeight: '600', fontSize: 14 },

  section: { marginBottom: 24 },
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#888', marginBottom: 8, marginLeft: 8 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 2 },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, backgroundColor: '#F9F9F9', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuText: { fontSize: 16, color: '#333' },

  logoutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF0F0', padding: 16, borderRadius: 12, marginBottom: 24 },
  logoutText: { color: '#FF4444', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  
  versionText: { textAlign: 'center', color: '#ccc', fontSize: 12 },
});



