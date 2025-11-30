// panels/customer/components/Home/BudgetStrip.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ASSETS = {
    budgetIcon: { uri: 'https://cdn-icons-png.flaticon.com/512/1011/1011228.png' },
};

export default function BudgetStrip() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
        style={styles.budgetStrip} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AccountTab')} // Redirect to Account for Budget settings
    >
        <View style={styles.budgetLeft}>
            <View style={styles.iconCircle}>
                <Image source={ASSETS.budgetIcon} style={styles.budgetIcon} />
            </View>
            <View>
                <Text style={styles.budgetLabel}>Weekly Budget</Text>
                <Text style={styles.budgetText}>
                    Spent ₹120 of <Text style={styles.budgetAmount}>₹500</Text>
                </Text>
            </View>
        </View>
        
        <View style={styles.rightArrow}>
            <Ionicons name="chevron-forward" size={20} color="#D84315" />
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  budgetStrip: { 
      marginTop: 24, 
      backgroundColor: '#FFF3E0', // Light Orange
      borderRadius: 20, 
      padding: 16, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FFE0B2'
  },
  budgetLeft: { 
      flexDirection: 'row', 
      alignItems: 'center',
      gap: 12 
  },
  iconCircle: {
      width: 40, height: 40, borderRadius: 20,
      backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'
  },
  budgetIcon: { width: 24, height: 24, resizeMode: 'contain' },
  
  budgetLabel: { fontSize: 11, color: '#BF360C', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  budgetText: { fontSize: 15, color: '#3E2723', fontWeight: '500' },
  budgetAmount: { fontWeight: '800', color: '#D84315' },

  rightArrow: {
      width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.5)',
      justifyContent: 'center', alignItems: 'center'
  }
});
