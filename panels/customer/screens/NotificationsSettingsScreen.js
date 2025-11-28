import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationsSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    orders: true,
    offers: true,
    delivery: true,
    news: false
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const renderRow = (label, key) => (
    <View style={styles.row}>
       <Text style={styles.label}>{label}</Text>
       <Switch 
         trackColor={{ false: "#767577", true: "#A0CFA0" }}
         thumbColor={settings[key] ? "#12783D" : "#f4f3f4"}
         onValueChange={() => toggle(key)}
         value={settings[key]}
       />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.title}>Notification Settings</Text>
      </View>

      <View style={styles.content}>
         {renderRow("Order Updates", "orders")}
         {renderRow("Delivery Tracking", "delivery")}
         {renderRow("Offers & Promos", "offers")}
         {renderRow("App News", "news")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  content: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  label: { fontSize: 16, color: '#333' },
});



