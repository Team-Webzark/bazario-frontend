// panels/customer/screens/OrderTrackingScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderTrackingScreen({ navigation }) {
  // Mock Status Steps
  const steps = [
    { id: 1, title: 'Order Confirmed', sub: 'We have received your order', time: '10:30 AM', icon: 'checkmark-circle', active: true },
    { id: 2, title: 'Items Picked', sub: 'Partner has picked up your items', time: '10:45 AM', icon: 'basket', active: true },
    { id: 3, title: 'Out for Delivery', sub: 'Partner is on the way to your location', time: '11:00 AM', icon: 'bicycle', active: true },
    { id: 4, title: 'At Your Doorstep', sub: 'Partner has reached your location', time: '--:--', icon: 'home', active: false },
    { id: 5, title: 'Delivered', sub: 'Order delivered successfully', time: '--:--', icon: 'gift', active: false },
  ];

  const handleCallDriver = () => {
    Linking.openURL(`tel:9876543210`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* ETA Card */}
        <View style={styles.etaCard}>
           <View>
              <Text style={styles.etaLabel}>Arriving in</Text>
              <Text style={styles.etaTime}>12 mins</Text>
           </View>
           <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png' }} 
              style={styles.etaImage} 
           />
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
           <Text style={styles.sectionTitle}>Order Status</Text>
           
           <View style={styles.timelineContainer}>
              {steps.map((step, index) => (
                 <View key={step.id} style={styles.timelineItem}>
                    {/* Left: Line & Icon */}
                    <View style={styles.timelineLeft}>
                       <View style={[styles.iconCircle, step.active ? styles.iconActive : styles.iconInactive]}>
                          <Ionicons name={step.icon} size={20} color={step.active ? '#fff' : '#9CA3AF'} />
                       </View>
                       {index < steps.length - 1 && (
                          <View style={[styles.line, step.active && steps[index+1].active ? styles.lineActive : styles.lineInactive]} />
                       )}
                    </View>

                    {/* Right: Content */}
                    <View style={styles.timelineContent}>
                       <View style={styles.titleRow}>
                          <Text style={[styles.stepTitle, step.active && styles.textActive]}>{step.title}</Text>
                          <Text style={styles.stepTime}>{step.time}</Text>
                       </View>
                       <Text style={styles.stepSub}>{step.sub}</Text>
                    </View>
                 </View>
              ))}
           </View>
        </View>

      </ScrollView>

      {/* Driver Card (Bottom Fixed) */}
      <View style={styles.driverFooter}>
         <View style={styles.driverRow}>
            <Image 
               source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
               style={styles.driverImg} 
            />
            <View style={styles.driverInfo}>
               <Text style={styles.driverName}>Ramesh Kumar</Text>
               <Text style={styles.driverBike}>UP-25-AB-1234 • 4.8 ⭐</Text>
            </View>
            <TouchableOpacity style={styles.callBtn} onPress={handleCallDriver}>
               <Ionicons name="call" size={20} color="#fff" />
            </TouchableOpacity>
         </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  backBtn: { padding: 4 },

  scrollContent: { padding: 20 },

  // ETA Card
  etaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  etaLabel: { fontSize: 14, color: '#166534', fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  etaTime: { fontSize: 32, fontWeight: '800', color: '#12783D' },
  etaImage: { width: 80, height: 80, resizeMode: 'contain' },

  // Timeline
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 24 },
  timelineContainer: { paddingLeft: 8 },
  timelineItem: { flexDirection: 'row', minHeight: 80 },
  
  timelineLeft: { alignItems: 'center', width: 40, marginRight: 16 },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    zIndex: 1,
  },
  iconActive: { backgroundColor: '#12783D', shadowColor: '#12783D', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  iconInactive: { backgroundColor: '#F3F4F6' },
  
  line: { width: 2, flex: 1, marginVertical: 4 },
  lineActive: { backgroundColor: '#12783D' },
  lineInactive: { backgroundColor: '#E5E7EB' },

  timelineContent: { flex: 1, paddingTop: 8 },
  titleRow: { flexDirection: 'row', justifyContents: 'space-between', marginBottom: 4 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#9CA3AF', flex: 1 },
  textActive: { color: '#111827', fontWeight: '700' },
  stepTime: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  stepSub: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  // Driver Footer
  driverFooter: {
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#fff',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  driverRow: { flexDirection: 'row', alignItems: 'center' },
  driverImg: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 2 },
  driverBike: { fontSize: 13, color: '#6B7280' },
  callBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#12783D',
    justifyContent: 'center', alignItems: 'center',
    elevation: 4,
    shadowColor: '#12783D',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
