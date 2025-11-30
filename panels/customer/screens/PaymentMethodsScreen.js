// panels/customer/screens/PaymentMethodsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PaymentMethodsScreen({ navigation }) {
  // Mock State
  const [cards, setCards] = useState([
    { id: '1', name: 'HDFC Bank Debit Card', number: '**** **** **** 1234', type: 'card' },
  ]);
  const [upis, setUpis] = useState([
    { id: '2', name: 'Google Pay', number: 'shadmaan@oksbi', type: 'upi' },
  ]);

  const handleDelete = (id, type) => {
    Alert.alert("Remove Method", "Are you sure?", [
        { text: "Cancel" },
        { 
            text: "Remove", 
            style: 'destructive',
            onPress: () => {
                if (type === 'card') setCards(prev => prev.filter(c => c.id !== id));
                else setUpis(prev => prev.filter(u => u.id !== id));
            }
        }
    ]);
  };

  const handleAddMethod = () => {
      Alert.alert("Add Payment Method", "Feature coming soon!");
  };

  const renderMethod = (item) => (
    <View key={item.id} style={styles.card}>
        <View style={[styles.iconBox, item.type === 'card' ? styles.cardBg : styles.upiBg]}>
            <Ionicons 
                name={item.type === 'card' ? "card" : "phone-portrait-outline"} 
                size={20} 
                color={item.type === 'card' ? "#1565C0" : "#2E7D32"} 
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.methodName}>{item.name}</Text>
            <Text style={styles.methodDetail}>{item.number}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id, item.type)} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
         </TouchableOpacity>
         <Text style={styles.title}>Payment Methods</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
         
         {/* Saved Cards */}
         <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            <TouchableOpacity onPress={handleAddMethod}>
                <Text style={styles.addLink}>+ Add New</Text>
            </TouchableOpacity>
         </View>
         {cards.map(renderMethod)}
         {cards.length === 0 && <Text style={styles.emptyText}>No saved cards</Text>}

         {/* UPI */}
         <View style={[styles.sectionHeaderRow, { marginTop: hp('3%') }]}>
            <Text style={styles.sectionTitle}>UPI IDs</Text>
            <TouchableOpacity onPress={handleAddMethod}>
                <Text style={styles.addLink}>+ Add New</Text>
            </TouchableOpacity>
         </View>
         {upis.map(renderMethod)}
         {upis.length === 0 && <Text style={styles.emptyText}>No saved UPIs</Text>}

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

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: hp('1.8%'), fontWeight: '700', color: '#4B5563', textTransform: 'uppercase', letterSpacing: 0.5 },
  addLink: { fontSize: hp('1.6%'), fontWeight: '600', color: '#12783D' },

  card: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
      padding: 16, borderRadius: 16, marginBottom: 12, 
      borderWidth: 1, borderColor: '#F3F4F6',
      shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1
  },
  
  iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardBg: { backgroundColor: '#E3F2FD' }, // Light Blue for Cards
  upiBg: { backgroundColor: '#E8F5E9' },  // Light Green for UPI

  info: { flex: 1 },
  methodName: { fontWeight: '700', fontSize: 16, color: '#1F2937', marginBottom: 2 },
  methodDetail: { color: '#6B7280', fontSize: 13 },

  deleteBtn: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 8 },
  
  emptyText: { color: '#9CA3AF', fontStyle: 'italic', marginLeft: 4 },
});
