// panels/customer/screens/AccountScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function AccountScreen({ navigation }) {
  
  // Handle Image Upload
  const handleImageUpload = () => {
    Alert.alert(
        "Update Profile Photo",
        "Choose an option",
        [
            { text: "Camera", onPress: () => console.log("Open Camera") },
            { text: "Gallery", onPress: () => console.log("Open Gallery") },
            { text: "Cancel", style: "cancel" }
        ]
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'UniversalSignIn' }] }) }
    ]);
  };

  const menuItems = [
    { icon: 'location-outline', title: 'Saved Addresses', screen: 'SavedAddresses', color: '#E3F2FD', iconColor: '#1565C0' },
    { icon: 'card-outline', title: 'Payment Methods', screen: 'PaymentMethods', color: '#E8F5E9', iconColor: '#2E7D32' },
    { icon: 'notifications-outline', title: 'Notifications', screen: 'NotificationsSettings', color: '#FFF3E0', iconColor: '#EF6C00' },
    { icon: 'heart-outline', title: 'My Favorites', screen: 'CategoryListing', color: '#FCE4EC', iconColor: '#C2185B' },
    { icon: 'settings-outline', title: 'Preferences', screen: 'PreferencesEdit', color: '#F3E5F5', iconColor: '#7B1FA2' },
    { icon: 'help-circle-outline', title: 'Help & Support', screen: 'IssueReporting', color: '#E0F2F1', iconColor: '#00695C' },
    { icon: 'information-circle-outline', title: 'About App', screen: null, color: '#EEEEEE', iconColor: '#424242' },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.menuItem}
      onPress={() => item.screen ? navigation.navigate(item.screen) : null}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <View style={[styles.iconBox, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={hp('2.5%')} color={item.iconColor} />
        </View>
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <View style={styles.arrowBox}>
         <Ionicons name="chevron-forward" size={hp('2%')} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleImageUpload}>
             <Image 
               source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} 
               style={styles.avatar} 
             />
             <View style={styles.editIconBadge}>
                <Ionicons name="camera" size={12} color="#fff" />
             </View>
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Shadmaan</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
            
            {/* Edit Profile Navigation */}
            <TouchableOpacity 
              style={styles.editBtn}
              onPress={() => navigation.navigate('PreferencesEdit')}
            >
              <Text style={styles.editBtnText}>Edit Profile</Text>
              <Ionicons name="pencil" size={12} color="#12783D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>YOUR ACCOUNT</Text>
          <View style={styles.menuGroup}>
             {menuItems.slice(0, 4).map(renderMenuItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>APP SETTINGS</Text>
          <View style={styles.menuGroup}>
             {menuItems.slice(4).map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutIconBox}>
             <Ionicons name="log-out-outline" size={hp('2.5%')} color="#FF4444" />
          </View>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footerInfo}>
           <Text style={styles.versionText}>Bazario App v1.0.0</Text>
        </View>
        <View style={{ height: hp('10%') }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { paddingHorizontal: wp('5%'), paddingVertical: hp('2%'), backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: hp('3%'), fontWeight: '800', color: '#111827' },
  scrollContent: { paddingHorizontal: wp('5%'), paddingTop: hp('2%') },
  
  profileCard: { flexDirection: 'row', backgroundColor: '#fff', padding: wp('5%'), borderRadius: 20, marginBottom: hp('3%'), alignItems: 'center', elevation: 2 },
  avatarContainer: { position: 'relative', marginRight: wp('4%') },
  avatar: { width: wp('18%'), height: wp('18%'), borderRadius: wp('9%') },
  editIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#12783D', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  profileInfo: { flex: 1 },
  userName: { fontSize: hp('2.4%'), fontWeight: '800', color: '#1F2937', marginBottom: 2 },
  userPhone: { fontSize: hp('1.8%'), color: '#6B7280', marginBottom: 8, fontWeight: '500' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editBtnText: { color: '#12783D', fontWeight: '700', fontSize: hp('1.6%') },

  section: { marginBottom: hp('3%') },
  sectionHeader: { fontSize: hp('1.6%'), fontWeight: '700', color: '#9CA3AF', marginBottom: hp('1.5%'), marginLeft: 8 },
  menuGroup: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', elevation: 1 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: hp('2%'), borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: wp('10%'), height: wp('10%'), borderRadius: wp('3%'), justifyContent: 'center', alignItems: 'center', marginRight: wp('3.5%') },
  menuText: { fontSize: hp('1.9%'), color: '#374151', fontWeight: '600' },
  arrowBox: { opacity: 0.5 },

  logoutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEF2F2', padding: hp('2%'), borderRadius: 16, marginBottom: hp('3%'), borderWidth: 1, borderColor: '#FEE2E2' },
  logoutIconBox: { marginRight: 8 },
  logoutText: { color: '#EF4444', fontWeight: '700', fontSize: hp('2%') },
  footerInfo: { alignItems: 'center', marginBottom: hp('2%') },
  versionText: { color: '#9CA3AF', fontSize: hp('1.6%'), fontWeight: '600' },
});
