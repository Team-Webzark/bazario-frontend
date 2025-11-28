import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PaymentMethodsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.title}>Payment Methods</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         <Text style={styles.sectionTitle}>Saved Cards</Text>
         
         <View style={styles.card}>
            <Ionicons name="card" size={24} color="#12783D" />
            <View style={styles.info}>
               <Text style={styles.cardName}>HDFC Bank Debit Card</Text>
               <Text style={styles.cardNum}>**** **** **** 1234</Text>
            </View>
            <TouchableOpacity>
               <Ionicons name="trash-outline" size={20} color="#FF4444" />
            </TouchableOpacity>
         </View>

         <Text style={[styles.sectionTitle, { marginTop: 24 }]}>UPI IDs</Text>
         <View style={styles.card}>
            <Ionicons name="phone-portrait-outline" size={24} color="#12783D" />
            <View style={styles.info}>
               <Text style={styles.cardName}>Google Pay</Text>
               <Text style={styles.cardNum}>shadmaan@oksbi</Text>
            </View>
            <TouchableOpacity>
               <Ionicons name="trash-outline" size={20} color="#FF4444" />
            </TouchableOpacity>
         </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  content: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1 },
  info: { flex: 1, marginLeft: 12 },
  cardName: { fontWeight: 'bold', color: '#333' },
  cardNum: { color: '#888', marginTop: 2 },
});



