// panels/customer/screens/NotificationsSettingsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function NotificationsSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    orders: true,
    delivery: true,
    offers: true,
    news: false
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const renderRow = (label, subLabel, key, icon) => (
    <View style={styles.row}>
        <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={20} color="#4B5563" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.subLabel}>{subLabel}</Text>
            </View>
        </View>
        <Switch 
            trackColor={{ false: "#E5E7EB", true: "#A7F3D0" }} // Light Green
            thumbColor={settings[key] ? "#12783D" : "#F3F4F6"} // Brand Green / Grey
            onValueChange={() => toggle(key)}
            value={settings[key]}
        />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
         </TouchableOpacity>
         <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         <Text style={styles.sectionHeader}>TRANSACTIONAL</Text>
         <View style={styles.card}>
             {renderRow("Order Updates", "Get notified when order is confirmed", "orders", "receipt-outline")}
             <View style={styles.divider} />
             {renderRow("Delivery Tracking", "Real-time updates on your delivery", "delivery", "bicycle-outline")}
         </View>

         <Text style={[styles.sectionHeader, { marginTop: hp('3%') }]}>PROMOTIONAL</Text>
         <View style={styles.card}>
             {renderRow("Offers & Promos", "Daily deals and discount alerts", "offers", "pricetag-outline")}
             <View style={styles.divider} />
             {renderRow("App News", "New features and app updates", "news", "newspaper-outline")}
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  header: { 
      flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp('5%'), 
      paddingVertical: hp('2%'), backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  backBtn: { padding: 4 },
  title: { fontSize: hp('2.2%'), fontWeight: '700', marginLeft: 16, color: '#111' },

  content: { padding: wp('5%') },

  sectionHeader: { fontSize: hp('1.6%'), fontWeight: '700', color: '#9CA3AF', marginBottom: 12, marginLeft: 4, letterSpacing: 0.5 },
  
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 16 },
  
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 2 },
  subLabel: { fontSize: 13, color: '#9CA3AF', lineHeight: 18 },

  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
});
